import React from "react";
import { useNavigate } from "react-router-dom";
import "./courses.css";
import { online } from "../../dummydata";
import Heading from "../common/heading/Heading";

const OnlineCourses = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseName) => {
    console.log("Cours sélectionné :", courseName); // Vérifiez que le nom du cours est correct
    navigate(`/course/${courseName}`);
  };

  console.log("Données des cours :", online); // Vérifiez les données des cours

  return (
    <section className="online">
      <div className="container">
        <Heading subtitle="COURSES" title="Browse Our Online Courses" />
        <div className="content grid3">
          {online.map((course, index) => (
            <div
              key={index}
              className="box"
              onClick={() => handleCourseClick(course.courseName)}
            >
              <div className="img">
                {course.cover && <img src={course.cover} alt={course.courseName} />}
                {course.hoverCover && <img src={course.hoverCover} alt="" className="show" />}
              </div>
              <h1>{course.courseName}</h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnlineCourses;