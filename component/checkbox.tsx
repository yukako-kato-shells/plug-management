interface CheckBoxProps {
  checked: boolean;
  handleChange: () => void;
  label: string;
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  return (
    <label>
      <input
        type='checkbox'
        checked={props.checked}
        onChange={props.handleChange}
      />
      {props.label}
    </label>
  )
}

export default CheckBox;