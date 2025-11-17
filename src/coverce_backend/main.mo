import Types "Types";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Int64 "mo:base/Int64";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";

persistent actor CoverceBackend {
  // Storage
  private transient var scriptCounter: Nat = 0;
  private transient var sceneCounter: Nat = 0;
  
  private transient let scripts = HashMap.HashMap<Types.ScriptId, Types.ScriptSubmission>(0, Nat.equal, Hash.hash);
  private transient let scriptContent = HashMap.HashMap<Types.ScriptId, Blob>(0, Nat.equal, Hash.hash);
  private transient let validations = HashMap.HashMap<Types.ScriptId, [Types.ValidationScore]>(0, Nat.equal, Hash.hash);
  private transient let aggregatedScores = HashMap.HashMap<Types.ScriptId, Types.AggregatedScore>(0, Nat.equal, Hash.hash);
  private transient let scenes = HashMap.HashMap<Types.ScriptId, [Types.Scene]>(0, Nat.equal, Hash.hash);
  private transient let movies = HashMap.HashMap<Types.ScriptId, Types.Movie>(0, Nat.equal, Hash.hash);
  
  // Validator registry (for MVP, can be expanded later)
  private transient let validators = HashMap.HashMap<Types.ValidatorId, Bool>(0, Principal.equal, Principal.hash);
  
  // Helper function to convert Nat to Int (for small values like scores 1-10)
  private func natToInt(n: Nat): Int {
    // Convert through Nat64 and Int64 (safe for values up to Int.max)
    let n64 = Nat64.fromNat(n);
    let i64 = Int64.fromNat64(n64);
    Int64.toInt(i64)
  };
  
  // ========== SCRIPT SUBMISSION ==========
  
  /// Submit a new script for validation
  public shared(msg) func submitScript(
    title: Text,
    format: Types.ScriptFormat,
    content: Blob,
    summary: ?Text
  ): async Types.Result<Types.ScriptId, Types.Error> {
    let userId = msg.caller;
    
    // Generate script ID
    let scriptId = scriptCounter;
    scriptCounter += 1;
    
    // Calculate content hash (simplified - in production use proper hashing)
    let contentHash = await calculateHash(content);
    
    // Create submission
    let submission: Types.ScriptSubmission = {
      id = scriptId;
      title = title;
      author = userId;
      format = format;
      contentHash = contentHash;
      uploadedAt = Time.now();
      status = #PendingValidation;
      summary = summary;
    };
    
    // Store script and content
    scripts.put(scriptId, submission);
    scriptContent.put(scriptId, content);
    
    #ok(scriptId)
  };
  
  /// Get script details
  public query func getScript(scriptId: Types.ScriptId): async Types.Result<Types.ScriptSubmission, Types.Error> {
    switch (scripts.get(scriptId)) {
      case null #err(#NotFound);
      case (?script) #ok(script);
    }
  };
  
  /// Get script content (blob)
  public query func getScriptContent(scriptId: Types.ScriptId): async Types.Result<Blob, Types.Error> {
    switch (scriptContent.get(scriptId)) {
      case null #err(#NotFound);
      case (?content) #ok(content);
    }
  };
  
  /// List all scripts pending validation
  public query func getPendingScripts(): async [Types.ScriptSubmission] {
    let pending = Buffer.Buffer<Types.ScriptSubmission>(0);
    for ((id, script) in scripts.entries()) {
      switch (script.status) {
        case (#PendingValidation) pending.add(script);
        case (_) {};
      };
    };
    Buffer.toArray(pending)
  };
  
  /// List all scripts
  public query func getAllScripts(): async [Types.ScriptSubmission] {
    Iter.toArray(scripts.vals())
  };
  
  // ========== VALIDATION ==========
  
  /// Register as a validator (for MVP - can add permission checks later)
  public shared(msg) func registerValidator(): async Bool {
    validators.put(msg.caller, true);
    true
  };
  
  /// Check if user is a validator
  public query func isValidator(userId: Types.ValidatorId): async Bool {
    Option.isSome(validators.get(userId))
  };
  
  /// Submit validation scores for a script
  public shared(msg) func submitValidation(
    scriptId: Types.ScriptId,
    scores: [(Types.Category, Types.Score)],
    comments: ?Text
  ): async Types.Result<Bool, Types.Error> {
    // Check if validator
    switch (validators.get(msg.caller)) {
      case null return #err(#Unauthorized);
      case (?_) {};
    };
    
    // Check if script exists
    switch (scripts.get(scriptId)) {
      case null return #err(#NotFound);
      case (?script) {
        // Update script status if needed
        if (script.status == #PendingValidation) {
          let updated = {
            script with status = #Validating
          };
          scripts.put(scriptId, updated);
        };
      };
    };
    
    // Create validation score
    let validation: Types.ValidationScore = {
      validatorId = msg.caller;
      scriptId = scriptId;
      scores = scores;
      comments = comments;
      timestamp = Time.now();
    };
    
    // Add to validations
    let existing = Option.get(validations.get(scriptId), []);
    let updated = Array.append(existing, [validation]);
    validations.put(scriptId, updated);
    
    // Recalculate aggregated scores
    await recalculateAggregatedScore(scriptId);
    
    #ok(true)
  };
  
  /// Get validation scores for a script
  public query func getValidations(scriptId: Types.ScriptId): async [Types.ValidationScore] {
    Option.get(validations.get(scriptId), [])
  };
  
  /// Get aggregated score for a script
  public query func getAggregatedScore(scriptId: Types.ScriptId): async Types.Result<Types.AggregatedScore, Types.Error> {
    switch (aggregatedScores.get(scriptId)) {
      case null #err(#NotFound);
      case (?score) #ok(score);
    }
  };
  
  /// Get top scoring script
  public query func getTopScript(): async ?Types.ScriptId {
    var topId: ?Types.ScriptId = null;
    var topScore: Float = 0.0;
    
    for ((id, score) in aggregatedScores.entries()) {
      if (score.totalScore > topScore) {
        topScore := score.totalScore;
        topId := ?id;
      };
    };
    
    topId
  };
  
  /// Select top script for movie generation
  public shared(msg) func selectTopScript(): async Types.Result<Types.ScriptId, Types.Error> {
    // In production, add permission check (only admin or automated process)
    
    switch (await getTopScript()) {
      case null #err(#NotFound);
      case (?scriptId) {
        // Update script status
        switch (scripts.get(scriptId)) {
          case null #err(#NotFound);
          case (?script) {
            let updated = {
              script with status = #Selected
            };
            scripts.put(scriptId, updated);
            #ok(scriptId)
          };
        }
      };
    }
  };
  
  // ========== MOVIE GENERATION ==========
  
  /// Start movie generation for a script
  public shared(msg) func startMovieGeneration(scriptId: Types.ScriptId): async Types.Result<Bool, Types.Error> {
    switch (scripts.get(scriptId)) {
      case null #err(#NotFound);
      case (?script) {
        // Update status
        let updated = {
          script with status = #Generating
        };
        scripts.put(scriptId, updated);
        
        // Create movie record
        let movie: Types.Movie = {
          scriptId = scriptId;
          movieHash = ""; // Will be set when generation completes
          thumbnailHash = null;
          duration = null;
          status = #Generating;
          createdAt = Time.now();
        };
        movies.put(scriptId, movie);
        
        // Parse script into scenes (simplified - in production use proper parsing)
        await parseScriptIntoScenes(scriptId);
        
        #ok(true)
      };
    }
  };
  
  /// Get movie status
  public query func getMovie(scriptId: Types.ScriptId): async Types.Result<Types.Movie, Types.Error> {
    switch (movies.get(scriptId)) {
      case null #err(#NotFound);
      case (?movie) #ok(movie);
    }
  };
  
  /// Update movie generation progress (called by AI orchestrator)
  public shared(msg) func updateMovieProgress(
    scriptId: Types.ScriptId,
    movieHash: Text,
    thumbnailHash: ?Text,
    duration: ?Nat
  ): async Types.Result<Bool, Types.Error> {
    switch (movies.get(scriptId)) {
      case null #err(#NotFound);
      case (?movie) {
        let updated: Types.Movie = {
          movieHash = movieHash;
          thumbnailHash = thumbnailHash;
          duration = duration;
          status = #Completed;
          scriptId = scriptId;
          createdAt = movie.createdAt;
        };
        movies.put(scriptId, updated);
        
        // Update script status
        switch (scripts.get(scriptId)) {
          case null {};
          case (?script) {
            let updatedScript = {
              script with status = #Completed
            };
            scripts.put(scriptId, updatedScript);
          };
        };
        
        #ok(true)
      };
    }
  };
  
  // ========== HELPER FUNCTIONS ==========
  
  private func recalculateAggregatedScore(scriptId: Types.ScriptId): async () {
    switch (validations.get(scriptId)) {
      case null {};
      case (?validationList) {
        if (validationList.size() == 0) return;
        
        // Initialize category totals
        var storyTotal: Float = 0.0;
        var charactersTotal: Float = 0.0;
        var dialogueTotal: Float = 0.0;
        var originalityTotal: Float = 0.0;
        var structureTotal: Float = 0.0;
        var visualTotal: Float = 0.0;
        
        var storyCount: Nat = 0;
        var charactersCount: Nat = 0;
        var dialogueCount: Nat = 0;
        var originalityCount: Nat = 0;
        var structureCount: Nat = 0;
        var visualCount: Nat = 0;
        
        // Sum scores
        for (validation in validationList.vals()) {
          for ((category, score) in validation.scores.vals()) {
            switch (category) {
              case (#Story) {
                storyTotal += Float.fromInt(natToInt(score));
                storyCount += 1;
              };
              case (#Characters) {
                charactersTotal += Float.fromInt(natToInt(score));
                charactersCount += 1;
              };
              case (#Dialogue) {
                dialogueTotal += Float.fromInt(natToInt(score));
                dialogueCount += 1;
              };
              case (#Originality) {
                originalityTotal += Float.fromInt(natToInt(score));
                originalityCount += 1;
              };
              case (#Structure) {
                structureTotal += Float.fromInt(natToInt(score));
                structureCount += 1;
              };
              case (#VisualPotential) {
                visualTotal += Float.fromInt(natToInt(score));
                visualCount += 1;
              };
            };
          };
        };
        
        // Calculate averages
        let storyAvg = if (storyCount > 0) storyTotal / Float.fromInt(natToInt(storyCount)) else 0.0;
        let charactersAvg = if (charactersCount > 0) charactersTotal / Float.fromInt(natToInt(charactersCount)) else 0.0;
        let dialogueAvg = if (dialogueCount > 0) dialogueTotal / Float.fromInt(natToInt(dialogueCount)) else 0.0;
        let originalityAvg = if (originalityCount > 0) originalityTotal / Float.fromInt(natToInt(originalityCount)) else 0.0;
        let structureAvg = if (structureCount > 0) structureTotal / Float.fromInt(natToInt(structureCount)) else 0.0;
        let visualAvg = if (visualCount > 0) visualTotal / Float.fromInt(natToInt(visualCount)) else 0.0;
        
        let totalScore = (storyAvg + charactersAvg + dialogueAvg + originalityAvg + structureAvg + visualAvg) / 6.0;
        
        let aggregated: Types.AggregatedScore = {
          scriptId = scriptId;
          categoryScores = [
            (#Story, storyAvg),
            (#Characters, charactersAvg),
            (#Dialogue, dialogueAvg),
            (#Originality, originalityAvg),
            (#Structure, structureAvg),
            (#VisualPotential, visualAvg)
          ];
          totalScore = totalScore;
          validatorCount = validationList.size();
        };
        
        aggregatedScores.put(scriptId, aggregated);
      };
    };
  };
  
  private func parseScriptIntoScenes(scriptId: Types.ScriptId): async () {
    // Simplified scene parsing - in production, use proper Fountain/PDF parser
    // For now, create placeholder scenes
    let sceneList = Buffer.Buffer<Types.Scene>(0);
    
    // Create 5 placeholder scenes (in production, parse actual script)
    var i = 0;
    while (i < 5) {
      let scene: Types.Scene = {
        id = sceneCounter;
        scriptId = scriptId;
        sceneNumber = i + 1;
        description = "Scene " # Nat.toText(i + 1);
        prompt = "Generate video for scene " # Nat.toText(i + 1);
        status = #Pending;
      };
      sceneList.add(scene);
      sceneCounter += 1;
      i += 1;
    };
    
    scenes.put(scriptId, Buffer.toArray(sceneList));
  };
  
  private func calculateHash(content: Blob): async Text {
    // Simplified hash - in production use SHA256 or similar
    // For MVP, use a simple text representation
    let size = Blob.toArray(content).size();
    "hash_" # Nat.toText(size) # "_" # Int.toText(Time.now())
  };
};



