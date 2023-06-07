const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <div>
      {/* <li>
        {note.name} {note.number}
      </li> */}
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    </div>
  );
};

export default Note;
