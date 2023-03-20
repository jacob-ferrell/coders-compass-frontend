import { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import postSkill from '../../api/postSkill';

export default function NewSkill(props) {
  const queryClient = useQueryClient();
  const [skill, setSkill] = useState('');

  const { mutate } = useMutation(
    postSkill,
    {
        optimisticUpdate: (oldData, newSkill) => {
            const newData = [
                ...oldData,
                newSkill
            ];
            return newData
        }
    }
  );

  const handleSubmit = e => {
    e.preventDefault();

  }

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="skill">Skill To Learn</label>
        <input
          onChange={(e) => setSkill(e.target.value)}
          type="text"
          name="skill"
        />
        {goals?.map((goal, i) => (
          <div className="text-left" key={i}>{`${i + 1}.${
            goal.description
          }`}</div>
        ))}
        <button className="bg-purple-500" type="submit">
          Submit
        </button>
      </form>
      {!!goals.length ? (
        <button className="mt-4" onClick={postGoals}>
          Save Goals
        </button>
      ) : null}
    </>
  );
}
