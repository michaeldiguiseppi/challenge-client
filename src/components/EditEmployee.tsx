import React, { useRef, useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import type { Employee } from "./types";

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
  const [editEmployee, { data }] = useMutation(EDIT_EMPLOYEE);

  useEffect(() => {
    if (data) {
      editFinished(false);
    }
  }, [data]);

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
            Title:{" "}
            <select
              ref={titleRef}
              defaultValue={title}
              onChange={e => setTitle(e.target.value)}
            >
              {Object.values(Titles).map(title => (
                <option value={title} key={title}>
                  {title}
                </option>
              ))}
            </select>
            First:{" "}
            <input
              ref={firstNameRef}
              value={first}
              onChange={e => setFirst(e.target.value)}
              data-testid="edit-employee-first-name"
            />
            Last:{" "}
            <input
              ref={lastNameRef}
              value={last}
              onChange={e => setLast(e.target.value)}
              data-testid="edit-employee-last-name"
            />
          </div>
        </div>
        <div className="employee-edit-contact-info">
          Email:{" "}
          <input
            ref={emailRef}
            value={email}
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
