import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./JS/Login/Login";
import GetEmpDetails from "./JS/EmployeeModule/GetEmpDetails";
import SendEmpDetails from "./JS/EmployeeModule/SendEmpDetails";
import UpdateEmpDetails from "./JS/EmployeeModule/UpdateEmpDetails";
import ViewEmpDetails from "./JS/EmployeeModule/ViewEmpDetails";
import AssignTraining from "./JS/TrainingModule/AssignTraining";
import AddTraining from "./JS/TrainingModule/AddTraining";
import EditTraining from "./JS/TrainingModule/EditTraining";
import GetBatchDetails from "./JS/BatchModule/GetBatchDetails";
import AddBatchDetails from "./JS/BatchModule/AddBatchDetails";
import ViewBatchDetails from "./JS/BatchModule/ViewBatchDetails";
import UpdateBatchDetails from "./JS/BatchModule/UpdateBatchDetails";
import GetScheduleDetails from "./JS/SheduleModule/GetScheduleDetails";
import AddScheduleDetails from "./JS/SheduleModule/AddScheduleDetails";
import ViewScheduleDetails from "./JS/SheduleModule/ViewScheduleDetails";
import UpdateScheduleDetails from "./JS/SheduleModule/UpdateScheduleDetails";
import GetTrainerDetails from "./JS/TrainerModule/GetTrainerDetails";
import ViewTrainerDetails from "./JS/TrainerModule/ViewTrainerDetails";
import UpdateTrainerDetails from "./JS/TrainerModule/UpdateTrainerDetails";
import GetTaskDetails from "./JS/TaskModule/GetTaskDetails";
import ViewTaskDetails from "./JS/TaskModule/ViewTaskDetails";
import AddTaskDetails from "./JS/TaskModule/AddTaskDetails";
import UpdateTaskDetails from "./JS/TaskModule/UpdateTaskDetails";
import GetTaskEvaluationDetails from "./JS/TaskEvaluationModule/GetTaskEvaluationDetails";
import UpdateTaskEvaluationDetails from "./JS/TaskEvaluationModule/UpdateTaskEvaluationDetails";
import ViewTaskEvaluationDetails from "./JS/TaskEvaluationModule/ViewTaskEvaluationDetails";
import GetAttendanceDetails from "./JS/AttendanceModule/GetAttendanceDetails";
import UpdateAttendanceDetails from "./JS/AttendanceModule/UpdateAttendanceDetails";
import ViewAttendanceDetails from "./JS/AttendanceModule/ViewAttendanceDetails";
import GetTrainerMasters from "./JS/MastersModule/Trainer/GetTrainerMasters";
import AddTrainerMasters from "./JS/MastersModule/Trainer/AddTrainerMasters";
import UpdateTrainerMasters from "./JS/MastersModule/Trainer/UpdateTrainerMasters";
import GetSkillMasters from "./JS/MastersModule/Skill/GetSkillMasters";
import AddSkillMasters from "./JS/MastersModule/Skill/AddSkillMasters";
import UpdateSkillMasters from "./JS/MastersModule/Skill/UpdateSkillMasters";
import GetDesigMasters from "./JS/MastersModule/Designation/GetDesigMasters";
import AddDesgMasters from "./JS/MastersModule/Designation/AddDesgMasters";
import UpdateDesgMasters from "./JS/MastersModule/Designation/UpdateDesgMasters";
import GetTrainingMasters from "./JS/MastersModule/Training/GetTrainingMasters";
import AddTrainingMasters from "./JS/MastersModule/Training/AddTrainingMasters";
import UpdateTrainingMasters from "./JS/MastersModule/Training/UpdateTrainingMasters";
import GetLocationMasters from "./JS/MastersModule/Location/GetLocationMasters";
import AddLocationMasters from "./JS/MastersModule/Location/AddLocationMasters";
import UpdateLocationMasters from "./JS/MastersModule/Location/UpdateLocationMasters";
import Dashboard from "./JS/DashboadModule/Dashboard";

const Routers = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* EmployeeModule */}
          <Route path="/get" element={<GetEmpDetails />} />
          <Route path="/send" element={<SendEmpDetails />} />
          <Route path="/update/:empId" element={<UpdateEmpDetails />} />
          <Route path="/view/:empId" element={<ViewEmpDetails />} />
          {/* Assiign Training Module */}
          <Route path="/training" element={<AssignTraining />} />
          <Route path="/addTraing" element={<AddTraining />} />
          <Route path="/editTraining" element={<EditTraining />} />
          {/* Batch Module */}
          <Route path="/getBatch" element={<GetBatchDetails />} />
          <Route path="/addBatch" element={<AddBatchDetails />} />
          <Route
            path="/viewBatch/:id/:batchId"
            element={<ViewBatchDetails />}
          />
          <Route
            path="/updateBatch/:id/:batchId"
            element={<UpdateBatchDetails />}
          />
          {/* Schedule Module */}
          <Route path="/getSchedule" element={<GetScheduleDetails />} />
          <Route path="/addSchedule" element={<AddScheduleDetails />} />
          <Route
            path="/viewSchedule/:id/:BatchId"
            element={<ViewScheduleDetails />}
          />
          <Route
            path="/updateSchedule/:id/:BatchId"
            element={<UpdateScheduleDetails />}
          />
          {/* Trainer Module */}
          <Route path="/getTrainer" element={<GetTrainerDetails />} />
          <Route
            path="/viewTrainer/:BatchId"
            element={<ViewTrainerDetails />}
          />
          <Route
            path="/updateTrainer/:BatchId"
            element={<UpdateTrainerDetails />}
          />
          {/* Task Module */}
          <Route path="/getTask" element={<GetTaskDetails />} />
          <Route path="/viewTask/:batchId/:id" element={<ViewTaskDetails />} />
          <Route path="/addTask/" element={<AddTaskDetails />} />
          <Route
            path="/updateTask/:batchId/:id"
            element={<UpdateTaskDetails />}
          />
          {/* Task Evaluation */}
          <Route
            path="/getTaskEvaluation"
            element={<GetTaskEvaluationDetails />}
          />
          <Route
            path="/updateTaskEvaluation/:batchId/:id"
            element={<UpdateTaskEvaluationDetails />}
          />
          <Route
            path="/viewTaskEvaluation/:batchId/:id"
            element={<ViewTaskEvaluationDetails />}
          />
          {/* Attendance */}
          <Route path="/getAttendance" element={<GetAttendanceDetails />} />
          <Route
            path="/updateAttendance/:batchId"
            element={<UpdateAttendanceDetails />}
          />
          <Route
            path="/viewAttendance/:batchId"
            element={<ViewAttendanceDetails />}
          />
          {/* Masters Module */}
          {/* Trainer */}
          <Route path="/getTrainerMasters" element={<GetTrainerMasters />} />
          <Route path="/addTrainerMasters" element={<AddTrainerMasters />} />
          <Route
            path="/updateTrainerMasters/:id"
            element={<UpdateTrainerMasters />}
          />
          {/* skill */}
          <Route path="/getSkillMasters" element={<GetSkillMasters />} />
          <Route path="/addSkillMasters" element={<AddSkillMasters />} />
          <Route
            path="/updateSkillMasters/:id"
            element={<UpdateSkillMasters />}
          />
          {/* designation */}
          <Route path="/getDesgMasters" element={<GetDesigMasters />} />
          <Route path="/addDesgMasters" element={<AddDesgMasters />} />
          <Route
            path="/updateDesgMasters/:id"
            element={<UpdateDesgMasters />}
          />
          {/* trainer */}
          <Route path="/getTrainingMasters" element={<GetTrainingMasters />} />
          <Route path="/addTrainingMasters" element={<AddTrainingMasters />} />
          <Route
            path="/updateTrainingMasters/:id"
            element={<UpdateTrainingMasters />}
          />
          {/* location */}
          <Route path="/getLocationMasters" element={<GetLocationMasters />} />
          <Route path="/addLocationMasters" element={<AddLocationMasters />} />
          <Route
            path="/updateLocationMasters/:id"
            element={<UpdateLocationMasters />}
          />
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
