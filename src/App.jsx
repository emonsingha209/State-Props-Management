import "./App.css";
import CourseData from "./assets/data/course.json";
import Table from "./components/Table";

function App() {
  return (
    <>
      <Table courseData={CourseData} />
    </>
  );
}

export default App;
