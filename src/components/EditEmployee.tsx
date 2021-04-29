import React, { useRef, useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import type { Employee } from "./types";
import "./stylesheets/EditAndDisplayEmployee.css";

export const EDIT_EMPLOYEE = gql`
  mutation EditPerson($email: String!, $payload: EditPerson) {
    editPerson(email: $email, payload: $payload) {
      name {
        first
        last
        title
      }
      email
      picture {
        thumbnail
        large
        medium
      }
    }
  }
`;

export enum Titles {
  MR = "Mr",
  MS = "Ms",
  MRS = "Mrs",
  MISS = "Miss",
  MONSIEUR = "Monsieur",
  MADAME = "Madame",
}

export type EditEmployeeProps = {
  editFinished: (finished: boolean) => void;
  employee: Employee;
};

const EditEmployee: React.FC<EditEmployeeProps> = ({
  editFinished,
  employee,
}) => {
  const history = useHistory();
  const [editEmployee, { data }] = useMutation(EDIT_EMPLOYEE);

  useEffect(() => {
    if (data) {
      // Only replace the route if the email changes
      if (data.editPerson.email !== employee.email) {
        history.replace(`/people/${encodeURIComponent(data.editPerson.email)}`);
      }
      editFinished(false);
    }
  }, [data, editFinished, history]);

  //State
  const [first, setFirst] = useState(employee?.name.first);
  const [last, setLast] = useState(employee?.name.last);
  const [email, setEmail] = useState(employee?.email);
  const [title, setTitle] = useState(employee?.name.title);

  //Refs
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLSelectElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <div className="employee-edit-detail">
      <form
        onSubmit={e => {
          e.preventDefault();
          editEmployee({
            variables: {
              email: employee.email,
              payload: {
                title,
                first,
                last,
                email,
              },
            },
          });
        }}
      >
        <div className="employee-edit-header-photo">
          <img src={employee.picture?.large} alt={`${first}-${last}`} />
        </div>
        <div className="employee-edit-header-details">
          <div className="employee-edit-header-name">
            <label htmlFor="titleField">Title: </label>
            <select
              ref={titleRef}
              defaultValue={title}
              name="titleField"
              onChange={e => setTitle(e.target.value)}
            >
              {Object.values(Titles).map(title => (
                <option value={title} key={title}>
                  {title}
                </option>
              ))}
            </select>
            <label htmlFor="firstNameField">First: </label>
            <input
              ref={firstNameRef}
              value={first}
              name="firstNameField"
              onChange={e => setFirst(e.target.value)}
              data-testid="edit-employee-first-name"
            />
            <label htmlFor="lastNameField">Last: </label>
            <input
              ref={lastNameRef}
              value={last}
              name="lastNameField"
              onChange={e => setLast(e.target.value)}
              data-testid="edit-employee-last-name"
            />
          </div>
        </div>
        <div className="employee-edit-contact-info">
          <label htmlFor="emailField">Email: </label>
          <input
            ref={emailRef}
            value={email}
            name="emailField"
            onChange={e => setEmail(e.target.value)}
            data-testid="edit-employee-email"
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditEmployee;
