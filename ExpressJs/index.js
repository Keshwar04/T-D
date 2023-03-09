const express = require("express");
const app = express();
const sql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const reader = require("xlsx");

// const bodyParser = require('body-parser');
const PORT = 8080;

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended:true}));

const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "Project",
});

db.connect(() => {
  console.log("DB");
  var sql =
    "CREATE TABLE EmpDetailsData (id  INT PRIMARY KEY,name VARCHAR(255))";
  db.query(sql, (err, result) => {
    if (!err) console.log("Table");
  });
});

///get
app.get("/", (req, res) => {
  res.send("Hello");
});
app.get("/getDetails", (req, res) => {
  const getData = "select * from EmpDetails";
  db.query(getData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      // console.log(result);
    }
  });
});

//location
app.get("/locationDetailsForStateAndCity", (req, res) => {
  const fetchQuery = "select * from empLocationList";
  db.query(fetchQuery, (err, result) => {
    //  err ? res.send(err) : res.send(result)
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//get details by id
app.get("/getIdDetails", async (req, res) => {
  const { empId } = req.query;
  let result = {};
  try {
    result.empDetails = await getEmpDetails(empId);
    result.assignTraining = await getAssignTraining();
    result.BatchList = await getBatchList();
    result.BatchTrainingList = await getBatchTrainingList();
    result.scheduleDetails = await getScheduleDetails();
    result.firstQuery = await getFirstQuery(empId);
    result.secondQuery = await getSecondQuery(empId);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

let getFirstQuery = (empId) => {
  let first = empId;
  let fetchQuery =
    'select c.BatchId,c.StartTime,c.EndTime,c.TrainingName from ScheduleDetails c where  c.batchId in(select a.batchId from BatchTrainingList a where a.empId = "' +
    first +
    '")';
  return new Promise((resolve, reject) => {
    db.query(fetchQuery, first, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

let getSecondQuery = (empId) => {
  let first = empId;
  // let seccond = empId;
  let fetchQuery =
    'select a.trainingName,a.status from TrainingEmpDetails a where a.empId ="' +
    first +
    '" and a.trainingName in (select trainingName from ScheduleDetails where BatchId in( select btt.BatchId from BatchTrainingList btt where btt.empId="' +
    first +
    '"))';
  return new Promise((resolve, reject) => {
    db.query(fetchQuery, first, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

let getEmpDetails = (empId) => {
  const insertData = "select * from EmpDetails where empId = ?";
  return new Promise((resolve, reject) => {
    db.query(insertData, empId, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};
let getAssignTraining = () => {
  const insertData = "select * from TrainingEmpDetails";
  return new Promise((resolve, reject) => {
    db.query(insertData, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};
let getBatchList = () => {
  const insertData = "select * from Batchlist";
  return new Promise((resolve, reject) => {
    db.query(insertData, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};
let getBatchTrainingList = () => {
  const insertData = "select * from BatchTrainingList";
  return new Promise((resolve, reject) => {
    db.query(insertData, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};

//designation Master table
app.get("/getBasicDetailsForSave", (req, res) => {
  var list = {
    designation: [],
  };
  const getDesgData =
    "select designation from designation_list where status='ACTIVE' ";

  db.query(getDesgData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        console.log(result);
        let [arr1] = result;
        console.log("arr1==> ", arr1);
        let { designation } = arr1;
        console.log("Designation--> ", designation);
        list.designation = result;
        res.send(list);
      }
    }
  });
});

//location Master table
app.get("/location", (req, res) => {
  var list = {
    location: [],
  };
  const getDesgData =
    "select location from locationList where status='ACTIVE' ";

  db.query(getDesgData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        console.log(result);
        let [arr1] = result;
        console.log("arr1==> ", arr1);
        let { location } = arr1;
        console.log("location--> ", location);
        list.location = result;
        res.send(list);
      }
    }
  });
});

//skill Master table
app.get("/skillList", (req, res) => {
  var list = {
    skill: [],
  };
  const getDesgData = "select skill from skillList where status='ACTIVE' ";

  db.query(getDesgData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        console.log(result);
        let [arr1] = result;
        console.log("arr1==> ", arr1);
        let { skill } = arr1;
        console.log("skill--> ", skill);

        list.skill = result;
        res.send(list);
      }
    }
  });
});

///Send
app.post("/SendDetails", (req, res) => {
  const {
    empName,
    empLastName,
    empId,
    empMobNo,
    empEmail,
    empDOB,
    gender,
    joinDate,
    prob,
    probStartDate,
    probEndDate,
    empDesg,
    locatio,
    skill,
    status,
    state,
    image,
  } = req.body;
  console.log(req.body);
  const sendQuerry =
    "insert into EmpDetails(empName,empLastName,empId,empMobNo,empEmail,empDOB,gender,joinDate,prob,probStartDate,probEndDate,empDesg,location,skill,status,state,image) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  db.query(
    sendQuerry,
    [
      empName,
      empLastName,
      empId,
      empMobNo,
      empEmail,
      empDOB,
      gender,
      joinDate,
      prob,
      probStartDate,
      probEndDate,
      empDesg,
      locatio,
      skill,
      status,
      state,
      image,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(err);
        console.log(result);
      }
    }
  );
});

///Update
app.put("/updateDetails/:id", (req, res) => {
  const {
    empName,
    empLastName,
    empId,
    empMobNo,
    empEmail,
    empDOB,
    gender,
    joinDate,
    prob,
    probStartDate,
    probEndDate,
    empDesg,
    location,
    skill,
    status,
    state,
    image,
  } = req.body;
  const { id } = req.params;

  console.log(req.body);
  const updateQuery =
    "update EmpDetails set empName = ?, empLastName = ?, empId = ?, empMobNo = ?, empEmail = ?, empDOB = ?, gender = ?, joinDate = ?, prob = ?, probStartDate = ?, probEndDate = ?, empDesg = ?, location = ?, skill = ?, status = ?, state = ?, image = ? where id = ?";

  db.query(
    updateQuery,
    [
      empName,
      empLastName,
      empId,
      empMobNo,
      empEmail,
      empDOB,
      gender,
      joinDate,
      prob,
      probStartDate,
      probEndDate,
      empDesg,
      location,
      skill,
      status,
      state,
      image,
      id,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

///Send
app.post("/sendStatus", (req, res) => {
  const { status } = req.body;
  const statusQuey = "insert into employeeStatus (status) values (?)";

  db.query(statusQuey, status, (err, result) => {
    if (err) {
      console.log(err);
      res.send("values not added");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

///Delete
app.delete("/deleteDetails/:id", (req, res) => {
  const { id } = req.params;
  const deletequery = "delete from EmpDetails where id =?";

  db.query(deletequery, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

///Login post
app.post("/login", (req, res) => {
  const { epmEmail, empPassword } = req.query;
  // and empPassword = ?'
  const loginQuery = "select * from Validate where empEmail = ?";
  db.query(loginQuery, [epmEmail], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result != null && result.length > 0) {
      console.log(result[0]);
      console.log(result);

      if (result[0].empPassword == empPassword) {
        res.send("Login Success");
        console.log(result);
      } else {
        res.send("Invalid Password");
      }
      // if(empPassword == result)
    } else {
      res.send("Invalid Username");
    }
  });
});

//////..............................Assign Training.................................////////

////Get empName with empId
app.get("/getValues", (req, res) => {
  const { empId } = req.query;
  console.log(empId);

  const getData = `select * from EmpDetails where empId = ? `;
  db.query(getData, empId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

////Training Master table
app.get("/training", (req, res) => {
  var list = {
    training: [],
  };

  const getDesgData =
    "select training from TrainingList where status='ACTIVE' ";

  db.query(getDesgData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        console.log(result);
        let [arr1] = result;
        console.log("arr1==> ", arr1);
        let { training } = arr1;
        console.log("skill--> ", training);
      }
      list.training = result;
      res.send(list);
    }
  });
});

///send
app.post("/trainingsendDetails", (req, res) => {
  console.log(req.body);
  const arr = req.body;
  // const { id, empName, trainName, sDate, eDate, status } = req.body;
  const sendingDetails =
    "insert into TrainingEmpDetails (empId,empName,trainingName,TSDate,TEDate,status) values (?,?,?,?,?,?)";
  for (let index = 0; index < arr.length; index++) {
    db.query(sendingDetails, [
      arr[index].id,
      arr[index].empName,
      arr[index].trainName,
      arr[index].sDate,
      arr[index].eDate,
      "Assigned",
    ]);
  }
});

///get
app.get("/trainingGetDetails", (req, res) => {
  const getData = "select * from TrainingEmpDetails";
  db.query(getData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //  res.send("Value fetched")
      res.send(result);
    }
  });
});

///delete
app.delete("/trainingDeleteDetails/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const deleteQuery = "delete from TrainingEmpDetails where id = ?";

  db.query(deleteQuery, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

///update
app.put("/trainingUpdateDetails/:id", (req, res) => {
  const { empId, empName, trainingName, TSDate, TEDate, status } = req.body;
  const { id } = req.params;

  const editQuery =
    "update TrainingEmpDetails set empId = ?, empName = ?, trainingName = ?, TSDate = ?, TEDate = ?, status = ? where id = ?";

  db.query(
    editQuery,
    [empId, empName, trainingName, TSDate, TEDate, status, id],
    (err, result) => {
      if (err) {
        res.send("not updated");
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

/////////////.........................Batch..............................////////////

app.get("/batchGetDetails", (req, res) => {
  const getData =
    "select b.empName, b.empId, b.trainingName, a.empMobNo, a.empEmail, a.empDesg, a.joinDate from EmpDetails a join TrainingEmpDetails b on a.empId = b.empId";
  db.query(getData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getBatchDetails", async (req, res) => {
  let getQuery = "select * from Batchlist";
  db.query(getQuery, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.post("/batchSendDetails", async (req, res) => {
  const {
    trainingName,
    batchLead,
    sDate,
    eDate,
    time,
    endTime,
    batchList,
    empDetailsLength,
  } = req.body;
  let status = false;
  console.log(batchList);
  const { empName, empMobNo, empEmail, empDesg, joinDate } = batchList[0];
  let [{ batchseq: batchId }] = await callProcedure();
  console.log("id --> ", batchId);
  const BatchlistTable =
    "insert into Batchlist (batchId,trainingName,batchLead,startDate,endDate,Time,endTime,availableResources,status) values (?,?,?,?,?,?,?,?,?)";

  db.query(
    BatchlistTable,
    [
      batchId,
      trainingName,
      batchLead,
      sDate,
      eDate,
      time,
      endTime,
      empDetailsLength,
      "Active",
    ],
    (err, result) => {
      if (result) {
        console.log(result);
        batchList.forEach((element) => {
          console.log(element);
          let {
            empDesg,
            empEmail,
            empId,
            empMobNo,
            empName,
            joinDate,
            trainingName,
          } = element;
          const BatchTrainingList =
            "insert into BatchTrainingList (empId,empName,trainingName,empMobNo,empEmail,empDesg,joinDate,batchId) values (?,?,?,?,?,?,?,?)";
          db.query(
            BatchTrainingList,
            [
              empId,
              empName,
              trainingName,
              empMobNo,
              empEmail,
              empDesg,
              joinDate,
              batchId,
            ],
            (err, result) => {
              if (result) {
                //  res.status(200);
                status = true;
              } else {
                //  res.send(err);
                status = false;
                console.log(err);
              }
            }
          );
        });
      } else {
        // res.send(err);
        console.log(err);
      }
      res.send({ status: "success" });
    }
  );
});

const callProcedure = async () => {
  const storedProcedureQuery = "select GETBATCHSEQ() as batchseq";
  return new Promise((resolve, reject) => {
    db.query(storedProcedureQuery, (error, result) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(result);
      }
    });
  });
};

//get details by id
app.get("/getBatchIdDetails", async (req, res) => {
  const { id } = req.query;
  const { batchId } = req.query;
  let result = {};
  try {
    result.batchListById = await getbatchListById(id);
    result.batchTrainingListById = await GetBatchTrainingListById(batchId);
    result.scheduleListById = await GetScheduleDetailsById(batchId);
    console.log(result);
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.send(err.message);
  }
});

///GetBtchListById
let getbatchListById = (id) => {
  const getIdData = "select * from Batchlist where id = ?";
  return new Promise((resolve, reject) => {
    db.query(getIdData, id, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};

let GetBatchTrainingListById = (batchId) => {
  const getData = "select * from BatchTrainingList where batchId = ?";
  return new Promise((resolve, reject) => {
    db.query(getData, batchId, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};

let GetScheduleDetailsById = (batchId) => {
  const getData = "select * from ScheduleDetails where batchId = ?";
  return new Promise((resolve, reject) => {
    db.query(getData, batchId, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};

app.put("/updateBatchDetails/:id", (req, res) => {
  const {
    batchId,
    trainingName,
    batchLead,
    startDate,
    endDate,
    Time,
    status,
    endTime,
  } = req.body;
  const { id } = req.params;
  const updateQuery =
    "update Batchlist set batchId = ?, trainingName = ?, batchlead = ?, startDate = ?, endDate = ?, Time = ?, status = ?, endTime = ? where id = ?";
  db.query(
    updateQuery,
    [
      batchId,
      trainingName,
      batchLead,
      startDate,
      endDate,
      Time,
      status,
      endTime,
      id,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.delete("/deleteBatchDeleteDetails/:id", (req, res) => {
  const { id } = req.params;
  const deleteQuery = "delete from BatchTrainingList where id = ?";

  db.query(deleteQuery, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

///get
app.get("/batchListDetails", (req, res) => {
  const getData = "select * from Batchlist";
  db.query(getData, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
///stored procedure
app.get("/storedProcedure/:id", async (req, res) => {
  const userid = req.params.id;
  const storedProcedureQuery = "call batch_seq()";
  //let result= await sequelize.query(storedProcedureQuery)
  //console.log('result: ',result)
});

///............................Schedule Module...............................

app.get("/trainerNameListDetails", (req, res) => {
  var list = {
    trainerName: [],
  };
  let getQuery = "select * from TrainerNameList where status= 'ACTIVE' ";
  db.query(getQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        let [arr1] = result;
        let { trainerName } = arr1;
        console.log(trainerName);

        list.trainerName = result;
        res.send(list);
      }
    }
  });
});

///send
app.post("/scheduleSendDetails", (req, res) => {
  const {
    batchId,
    desc,
    eTime,
    location,
    sTime,
    status,
    subTopic,
    topic,
    trainerName,
    eDate,
    sDate,
    trainName,
    trainerStatus,
  } = req.body;
  let inserQuery =
    "insert into ScheduleDetails (BatchId, Topic, SubTopic, TrainerName, TrainingName, StartDate, EndDate, StartTime, EndTime, Location, Status, Description,TrainerStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    inserQuery,
    [
      batchId,
      topic,
      subTopic,
      trainerName,
      trainName,
      sDate,
      eDate,
      sTime,
      eTime,
      location,
      status,
      desc,
      trainerStatus,
    ],
    (err, result) => {
      err ? res.send(err) : res.send(result);
    }
  );
});

app.get("/scheduleGetDetails", async (req, res) => {
  const getData = "select * from ScheduleDetails";
  db.query(getData, (err, result) => (err ? res.send(err) : res.send(result)));
});

app.get("/getScheduleBtyIdDetails", async (req, res) => {
  const { id } = req.query;
  const { batchId } = req.query;
  let result = {};
  try {
    result.scheduleDetailsById = await getScheduleDetailsById(id);
    result.batchTrainingListById = await GetBatchTrainingListByI(batchId);
    console.log(result);
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.send(err.message);
  }
});

///GetBtchListById
let getScheduleDetailsById = (id) => {
  const getIdData = "select * from ScheduleDetails where id = ?";
  return new Promise((resolve, reject) => {
    db.query(getIdData, id, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};

///GetBatchTrainingListById
let GetBatchTrainingListByI = (batchId) => {
  const getData = "select * from BatchTrainingList where batchId = ?";
  return new Promise((resolve, reject) => {
    db.query(getData, batchId, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};

//update
app.put("/updatingScheduleDetails/:id", (req, res) => {
  const { id } = req.params;
  const {
    BatchId,
    Description,
    EndDate,
    EndTime,
    Location,
    StartDate,
    StartTime,
    Status,
    SubTopic,
    Topic,
    TrainerName,
    TrainingName,
  } = req.body;
  let updateQuery =
    "update ScheduleDetails set BatchId = ?, Topic = ?, SubTopic = ?, TrainerName = ?, TrainingName = ?, StartDate = ?, EndDate = ?, StartTime = ?, EndTime = ?, Location = ?, Status = ?, Description = ? where id = ?";

  db.query(
    updateQuery,
    [
      BatchId,
      Topic,
      SubTopic,
      TrainerName,
      TrainingName,
      StartDate,
      EndDate,
      StartTime,
      EndTime,
      Location,
      Status,
      Description,
      id,
    ],
    (err, result) => {
      err ? res.send(err) : res.send(result);
    }
  );
});

//............................Trainer Module...............................
app.get("/updateTrainerDetails", async (req, res) => {
  let { BatchId } = req.query;
  let result = {};
  try {
    result.scheduleDetailsById = await GetScheduleDetailsForTrainerById(
      BatchId
    );
    result.batchTrainingListById = await GetBatchTrainingListForScheduleById(
      BatchId
    );
    console.log(result);
    return res.send(result);
  } catch {
    console.log(err);
    return res.send(err);
  }
});

let GetScheduleDetailsForTrainerById = (BatchId) => {
  const getQuery = "select * from ScheduleDetails where batchId = ?";
  return new Promise((resolve, reject) => {
    db.query(getQuery, BatchId, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

let GetBatchTrainingListForScheduleById = (BatchId) => {
  const getQuery = "select * from BatchTrainingList where BatchId = ?";
  return new Promise((resolve, reject) => {
    db.query(getQuery, BatchId, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

app.put("/updatingTrainingDetails/:BatchId", (req, res) => {
  const { BatchId } = req.params;
  const { Status, TrainerStatus, Description } = req.body;
  let updateQuery =
    "update ScheduleDetails set Status = ?, TrainerStatus = ?, Description = ? where BatchId = ?";
  db.query(
    updateQuery,
    [Status, TrainerStatus, Description, BatchId],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

//....................................Task Module..................................

app.post("/sendTaskDetails", (req, res) => {
  const {
    assignedBy,
    batchId,
    desc,
    eDate,
    sDate,
    scheduleId,
    taskTitle,
    taskType,
    status,
    currentDate,
  } = req.body;
  let sendQuerry =
    "insert into TaskDetails (taskTitle, assignedBy, taskType, batchId, scheduleId, startDate, endDate, description, status, currentDate) values (?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sendQuerry,
    [
      taskTitle,
      assignedBy,
      taskType,
      batchId,
      scheduleId,
      sDate,
      eDate,
      desc,
      status,
      currentDate,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getTaskDetails", (req, res) => {
  let getQuery = "select * from TaskDetails";
  db.query(getQuery, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.get("/getTaskDetailsById", async (req, res) => {
  let { batchId } = req.query;
  let { id } = req.query;
  let result = {};
  try {
    result.TaskDetailsById = await GetTaskDetailsById(id);
    result.batchTrainingListById = await TrainingListById(batchId);
    console.log(result);
    return res.send(result);
  } catch {
    console.log(err);
    return res.send(err);
  }
});

let GetTaskDetailsById = (id) => {
  const getQuery = "select * from TaskDetails where id = ?";
  return new Promise((resolve, reject) => {
    db.query(getQuery, id, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

let TrainingListById = (batchId) => {
  const getQuery = "select * from BatchTrainingList where batchId = ?";
  return new Promise((resolve, reject) => {
    db.query(getQuery, batchId, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

app.put("/updateTaskDetails/:id", (req, res) => {
  const { id } = req.params;
  const {
    batchId,
    taskTitle,
    assignedBy,
    taskType,
    currentDate,
    startTime,
    endTime,
    status,
    description,
  } = req.body;
  console.log(req.body);
  let updateQuery =
    "update TaskDetails set taskTitle = ?, assignedBy = ?, taskType = ?, batchId = ?, description = ?, status = ?, currentDate = ?, startTime = ?, endTime = ? where id = ?";

  db.query(
    updateQuery,
    [
      taskTitle,
      assignedBy,
      taskType,
      batchId,
      description,
      status,
      currentDate,
      startTime,
      endTime,
      id,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

//..................................Task Evaluation..........................................

app.get("/getTaskEvaluationDetails", (req, res) => {
  let getQuery =
    "select b.TrainingName, a.id, a.scheduleId, a.batchId from TaskDetails a join ScheduleDetails b on a.batchId = b.batchId";

  db.query(getQuery, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.post("/updatingBatchTrainingList/:batchId", (req, res) => {
  const { batchId } = req.params;
  const { remarks, score } = req.body;
  let sendQuerry =
    "update BatchTrainingList set score = ?, remarks = ? where batchId = ?";
  db.query(sendQuerry, [score, remarks, batchId], (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

//........................................Attendance......................................
app.get("/getAttendanceByDetails", async (req, res) => {
  let result = {};
  try {
    result.batchListTable = await GetBatchListTable();
    result.batchTrainingListTable = await GetBatchTrainingListTable();
    console.log(result);
    return res.send(result);
  } catch {
    console.log(err);
    return res.send(err);
  }
});

let GetBatchListTable = () => {
  const getQuery = "select * from Batchlist";
  return new Promise((resolve, reject) => {
    db.query(getQuery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

let GetBatchTrainingListTable = () => {
  const getQuery = "select * from BatchTrainingList";
  return new Promise((resolve, reject) => {
    db.query(getQuery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

app.get("/updateAttendanceDetailsById", async (req, res) => {
  let { batchId, id } = req.query;
  let result = {};
  try {
    result.batchDetailsById = await GetBatchDetailsById(batchId);
    result.batchTrainingListById = await batchTrainingListById(batchId, id);
    console.log(result);
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

let GetBatchDetailsById = (batchId, id) => {
  const getQuery = "select * from Batchlist where batchId = ?";
  return new Promise((resolve, reject) => {
    db.query(getQuery, [batchId, id], (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

let batchTrainingListById = (batchId, id) => {
  const getQuery = "select * from BatchTrainingList where batchId = ?";
  return new Promise((resolve, reject) => {
    db.query(getQuery, [batchId, id], (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

app.put("/updatingBatchTrainingListForAttendance/:id", (req, res) => {
  const arr = req.body;
  let updateQuery =
    "update BatchTrainingList set attendance = ?, reason = ? where id = ?";

  for (let index = 0; index < arr.length; index++) {
    db.query(updateQuery, [
      arr[index].attendance,
      arr[index].reason,
      arr[index].id,
    ]);
  }
});

//..................................Masters..............................

//desg
app.post("/sendDesginationDetails", (req, res) => {
  const { desg, status } = req.body;
  console.log(req.body);
  let sendQuery =
    "insert into designation_list (designation,status) values (?,?)";
  db.query(sendQuery, [desg, status], (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

//location
app.post("/sendLocationDetails", (req, res) => {
  const { state, city, status, date, updateDate, createdBy } = req.body;
  console.log(req.body);
  let sendQuery =
    "insert into empLocationList (city,state,status,createdDate,updatedDate,createdBy) values (?,?,?,?,?,?)";
  db.query(
    sendQuery,
    [city, state, status, date, updateDate, createdBy],
    (err, result) => {
      err ? res.send(err) : res.send(result);
    }
  );
});

app.get("/getLocationDetails", (req, res) => {
  let fetchQuery = "select * from empLocationList";
  db.query(fetchQuery, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.get("/getLocationDetailsById", (req, res) => {
  const { id } = req.query;
  let fetchQuery = "select * from empLocationList where id = ?";
  db.query(fetchQuery, id, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.put("/updateLocationDetailsById/:id", (req, res) => {
  const { id } = req.params;
  const { state, city, updatedDate } = req.body;
  console.log(req.body);
  let updateQuery =
    "update empLocationList set city = ?, state = ?, updatedDate = ? where id = ?";
  db.query(updateQuery, [city, state, updatedDate, id], (err, result) => {
    // err ? res.send(err) : res.send(result)
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

//training
app.post("/sendTrainingDetails", (req, res) => {
  const { training, status, date, updateDate, createdBy, img } = req.body;
  console.log(req.body);
  let sendQuery =
    "insert into TrainingList (training,status,createdDate,updatedDate,createdBy,image) values (?,?,?,?,?,?)";
  db.query(
    sendQuery,
    [training, status, date, updateDate, createdBy, img],
    (err, result) => {
      err ? res.send(err) : res.send(result);
    }
  );
});

app.get("/getTrainingDetails", (req, res) => {
  let fetchQuery = "select * from TrainingList";
  db.query(fetchQuery, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.get("/getTrainingNameDetailsById", (req, res) => {
  const { id } = req.query;
  let fetchQuery = "select * from TrainingList where id = ?";
  db.query(fetchQuery, id, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.put("/updateTrainingNameDetailsById/:id", (req, res) => {
  const { id } = req.params;
  const { training, updatedDate, image } = req.body;
  let updateQuery =
    "update TrainingList set training = ?, updatedDate = ?, image = ? where id = ?";
  db.query(updateQuery, [training, updatedDate, image, id], (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

//trainer
app.post("/sendTrainerDetails", (req, res) => {
  const { trainer, status, date, updateDate, createdBy } = req.body;
  console.log(req.body);
  let sendQuery =
    "insert into TrainerNameList (trainerName,status,createdDate,updatedDate,createdBy) values (?,?,?,?,?)";
  db.query(
    sendQuery,
    [trainer, status, date, updateDate, createdBy],
    (err, result) => {
      err ? res.send(err) : res.send(result);
    }
  );
});

app.get("/getTrainerNameDetails", (req, res) => {
  let fetchQuery = "select * from TrainerNameList";
  db.query(fetchQuery, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.get("/getTrainerNameDetailsById", (req, res) => {
  const { id } = req.query;
  let fetchQuery = "select * from TrainerNameList where id = ?";
  db.query(fetchQuery, id, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.put("/updateTrainerNameDetailsById/:id", (req, res) => {
  const { id } = req.params;
  const { trainerName, updatedDate } = req.body;
  console.log(req.body);
  let updateQuery =
    "update TrainerNameList set trainerName = ?, updatedDate = ? where id = ?";
  db.query(updateQuery, [trainerName, updatedDate, id], (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

//Desg
app.post("/sendDesgDetails", (req, res) => {
  const { designation, status, date, updateDate, createdBy } = req.body;
  console.log(req.body);
  let sendQuery =
    "insert into designation_list (designation,status,createdDate,updatedDate,createdBy) values (?,?,?,?,?)";
  db.query(
    sendQuery,
    [designation, status, date, updateDate, createdBy],
    (err, result) => {
      err ? res.send(err) : res.send(result);
    }
  );
});

app.get("/getDesgDetails", (req, res) => {
  let fetchQuery = "select * from designation_list";
  db.query(fetchQuery, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.get("/getDesgDetailsById", (req, res) => {
  const { id } = req.query;
  let fetchQuery = "select * from designation_list where id = ?";
  db.query(fetchQuery, id, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.put("/updateDesgDetailsById/:id", (req, res) => {
  const { id } = req.params;
  const { designation, updatedDate } = req.body;
  console.log(req.body);
  let updateQuery =
    "update designation_list set designation = ?, updatedDate = ? where id = ?";
  db.query(updateQuery, [designation, updatedDate, id], (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

//skill
app.post("/sendSkillDetails", (req, res) => {
  const { skill, status, date, updateDate, createdBy } = req.body;
  console.log(req.body);
  let sendQuery =
    "insert into skillList (skill,status,createdDate,updatedDate,createdBy) values (?,?,?,?,?)";
  db.query(
    sendQuery,
    [skill, status, date, updateDate, createdBy],
    (err, result) => {
      err ? res.send(err) : res.send(result);
    }
  );
});

app.get("/getSkillNameDetails", (req, res) => {
  let fetchQuery = "select * from skillList";
  db.query(fetchQuery, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.get("/getSkillNameDetailsById", (req, res) => {
  const { id } = req.query;
  let fetchQuery = "select * from skillList where id = ?";
  db.query(fetchQuery, id, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.put("/updateSkillDetailsById/:id", (req, res) => {
  const { id } = req.params;
  const { skill, updatedDate } = req.body;
  console.log(req.body);
  let updateQuery =
    "update skillList set skill = ?, updatedDate = ? where id = ?";
  db.query(updateQuery, [skill, updatedDate, id], (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

//................................Batch module............................................
app.get("/getDashboardDetails", async (req, res) => {
  let result = {};
  try {
    result.batchListDetails = await getbatchListDetails();
    result.scheduleDetails = await getScheduleDetails();
    result.batchTrainingListTable = await GetBatchTrainingListTable();
    result.trainingListTable = await trainingListTable();
    console.log(result);
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.send(err.message);
  }
});

let trainingListTable = () => {
  let fetchData = "select * from TrainingList";
  return new Promise((resolve, reject) => {
    db.query(fetchData, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

let getbatchListDetails = () => {
  const fetchData = "select * from Batchlist";
  return new Promise((resolve, reject) => {
    db.query(fetchData, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

let getScheduleDetails = () => {
  const fetchData = "select * from ScheduleDetails";
  return new Promise((resolve, reject) => {
    db.query(fetchData, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

///////.....................................................................................
let upload = multer();
app.post("/fileUpload", upload.single("file"), (req, res) => {
  // const {file} = req.body
  console.log(req.file);
  const encoded = req.file.buffer.toString("base64");
  console.log(encoded);
});

app.post("/excelFileReader", (req, res) => {
  const file = reader.readFile("./");
});

///...................................image upload.........................//////////
// var storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//     callBack(null, "./public/images/"); // './public/images/' directory name where save the file
//   },
//   filename: (req, file, callBack) => {
//     callBack(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// var upload = multer({
//   storage: storage,
// });

app.listen(PORT, () => {
  console.log("server running on:" + PORT);
});
