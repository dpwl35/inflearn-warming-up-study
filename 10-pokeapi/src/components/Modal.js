import React from 'react';

export default function Modal({ damageRelations, onClose }) {
  const valueClassNames = 'text-white text-sm px-3 py-1 rounded-2xl';
  const noneClassName = 'bg-gray-200 text-sm px-3 py-1 rounded-2xl';

  return (
    <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-[430px] border-2 border-gray-200 rounded-2xl px-5 pb-5 z-50'>
      <div className='flex w-full py-3 justify-between'>
        <p className='font-bold text-xl'>데미지 관계</p>
        <button type='button' className='font-bold' onClick={onClose}>
          X
        </button>
      </div>

      <div className='flex flex-col gap-4'>
        <div>
          <p className='font-bold text-lg mb-1'>Weak:</p>
          <div className='flex flex-wrap gap-2'>
            {damageRelations.double_damage_from.length > 0 ? (
              damageRelations.double_damage_from.map((type) => (
                <p
                  className={`bg-${type.name} ${valueClassNames}`}
                  key={type.name}
                >
                  {type.name} (2x)
                </p>
              ))
            ) : (
              <p className={`${noneClassName}`}>None</p>
            )}
          </div>
        </div>

        <div>
          <p className='font-bold text-lg mb-1'>Resistant:</p>
          <div className='flex flex-wrap gap-2'>
            {damageRelations.half_damage_from.length > 0 ? (
              damageRelations.half_damage_from.map((type) => (
                <p
                  className={`bg-${type.name} ${valueClassNames}`}
                  key={type.name}
                >
                  {type.name} (0.5x)
                </p>
              ))
            ) : (
              <p className={`${noneClassName}`}>None</p>
            )}
          </div>
        </div>

        <div>
          <p className='font-bold text-lg mb-1'>Immune:</p>
          <div className='flex flex-wrap gap-2'>
            {damageRelations.no_damage_from.length > 0 ? (
              damageRelations.no_damage_from.map((type) => (
                <p
                  className={`bg-${type.name} ${valueClassNames}`}
                  key={type.name}
                >
                  {type.name} (0x)
                </p>
              ))
            ) : (
              <p className={`${noneClassName}`}>None</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
