// import React from "react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import EditTeamComp from "../components/EditTeamComp";

// describe("EditTeamComp", () => {
//   test("renders the component", () => {
//     render(<EditTeamComp />);
//     expect(screen.getByText("Team")).toBeInTheDocument();
//   });

//   test("renders form fields and buttons", () => {
//     render(<EditTeamComp />);
//     expect(screen.getByLabelText("Name")).toBeInTheDocument();
//     expect(screen.getByText("Choose account")).toBeInTheDocument();
//     expect(screen.getByText("Save Changes")).toBeInTheDocument();
//   });

//   test("opens the modal when 'Choose account' button is clicked", () => {
//     render(<EditTeamComp />);
//     fireEvent.click(screen.getByText("Choose account"));
//     expect(screen.getByText("Select account")).toBeInTheDocument();
//   });
// });
