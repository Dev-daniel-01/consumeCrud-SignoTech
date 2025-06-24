export default function Option({ option, votes, disabled, onVote }) {
    return (
      <li>
        <label>
          <input
            type="radio"
            name="option"
            value={option.id}
            disabled={disabled}
            onChange={() => onVote(option.id)}
          />
          {option.text} — {votes || 0} votos
        </label>
      </li>
    );
  }