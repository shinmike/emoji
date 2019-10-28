import React from 'react';

const List = ({ emojiListRendered }) => {
  return (
    <div>
      <ul className="list-group">
        {emojiListRendered}
      </ul>
    </div>
  )
}

export default List;