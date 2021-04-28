import React, { useContext, useRef, useState, useEffect } from "react";
import { Redirect } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { EmployeeContext } from "../App";

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

type Props = {
  editFinished: (finished: boolean) => void;
};

const EditEmployee: React.FC<Props> = ({ editFinished }) => {
  const { selectedEmployee, selectEmployee } = useContext(EmployeeContext);
  const [editEmployee, { data }] = useMutation(EDIT_EMPLOYEE);

  useEffect(() => {
    if (data) {
      const { first, last } = data.editPerson.name;
      data.editPerson.name.full_name = `${first} ${last}`;
      selectEmployee(data.editPerson);
      editFinished(false);
    }
  }, [data]);

  //State
  const [first, setFirst] = useState(selectedEmployee?.name.first);
  const [last, setLast] = useState(selectedEmployee?.name.last);
  const [email, setEmail] = useState(selectedEmployee?.email);
  const [title, setTitle] = useState(selectedEmployee?.name.title);

  //Refs
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLSelectElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  if (!selectedEmployee) return null;

  return (
    <div className="employee-edit-detail">
      <form
        onSubmit={e => {
          e.preventDefault();
          editEmployee({
            variables: {
              email: selectedEmployee.email,
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
          <img src={selectedEmployee.picture?.large} alt={`${first}-${last}`} />
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
                <option value={title}>{title}</option>
              ))}
            </select>
            First:{" "}
            <input
              ref={firstNameRef}
              value={first}
              onChange={e => setFirst(e.target.value)}
            />
            Last:{" "}
            <input
              ref={lastNameRef}
              value={last}
              onChange={e => setLast(e.target.value)}
            />
          </div>
        </div>
        <div className="employee-edit-contact-info">
          Email:{" "}
          <input
            ref={emailRef}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditEmployee;
