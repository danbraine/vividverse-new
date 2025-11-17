module Types {
  // Script submission types
  public type ScriptId = Nat;
  public type ScriptHash = Text;
  public type UserId = Principal;
  public type ValidatorId = Principal;
  
  public type ScriptFormat = {
    #PDF;
    #Fountain;
    #Text;
  };
  
  public type ScriptSubmission = {
    id: ScriptId;
    title: Text;
    author: UserId;
    format: ScriptFormat;
    contentHash: ScriptHash;
    uploadedAt: Int; // Timestamp
    status: ScriptStatus;
    summary: ?Text;
  };
  
  public type ScriptStatus = {
    #PendingValidation;
    #Validating;
    #Validated;
    #Selected; // Top scoring script
    #Generating; // AI is making the movie
    #Completed; // Movie is ready
    #Rejected;
  };
  
  // Validation types
  public type Category = {
    #Story;
    #Characters;
    #Dialogue;
    #Originality;
    #Structure;
    #VisualPotential;
  };
  
  public type Score = Nat; // 1-10
  
  public type ValidationScore = {
    validatorId: ValidatorId;
    scriptId: ScriptId;
    scores: [(Category, Score)];
    comments: ?Text;
    timestamp: Int;
  };
  
  public type AggregatedScore = {
    scriptId: ScriptId;
    categoryScores: [(Category, Float)]; // Average scores
    totalScore: Float;
    validatorCount: Nat;
  };
  
  // Movie generation types
  public type SceneId = Nat;
  
  public type Scene = {
    id: SceneId;
    scriptId: ScriptId;
    sceneNumber: Nat;
    description: Text;
    prompt: Text;
    status: SceneStatus;
  };
  
  public type SceneStatus = {
    #Pending;
    #Generating;
    #Completed;
    #Failed;
  };
  
  public type Movie = {
    scriptId: ScriptId;
    movieHash: Text;
    thumbnailHash: ?Text;
    duration: ?Nat; // seconds
    status: MovieStatus;
    createdAt: Int;
  };
  
  public type MovieStatus = {
    #Generating;
    #Completed;
    #Failed;
  };
  
  // API response types
  public type Result<T, E> = {
    #ok: T;
    #err: E;
  };
  
  public type Error = {
    #NotFound;
    #Unauthorized;
    #InvalidInput;
    #StorageFull;
    #ProcessingFailed;
  };
};



