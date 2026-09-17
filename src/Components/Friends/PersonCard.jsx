import React from 'react'

const PersonCard = ({userDetails}) => {
    const colors = [
        '#0F172A',
        '#172554',
        '#1E3A8A',
        '#312E81',
        '#3730A3',
        '#4C1D95',
        '#581C87',
        '#164E63',
        '#134E4A',
    ];
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };
  return (
    <div className='flex' >
      <div className='rounded-full' style={{backgroundColor:getRandomColor()}}>
        <h2 className='text-lg'>{userDetails.name.slice(0,1)}</h2>
      </div>
    </div>
  )
}

export default PersonCard
