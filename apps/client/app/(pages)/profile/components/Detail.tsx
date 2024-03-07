import { GetUserAPIResponse } from '@repo/shared';
import React from 'react';

type Props = {
  user: GetUserAPIResponse;
};

export default function Detail({ user }: Props) {
  return (
    <article className='profile__container'>
      <div className='profile__detail cards'>
        <h4 className='profile__title'>Profile</h4>
        <p className='content__item'>
          Full name:
          <span className='content__value'>{user.full_name}</span>
        </p>
        <p className='content__item'>
          Email:
          <span className='content__value'>{user.email}</span>
        </p>
        <p className='content__item'>
          Phone:
          <span className='content__value'>{user.phone}</span>
        </p>
      </div>
      <div className='profile__statistic cards'>
        <p className='content__item'>
          Orders placed:
          <span className='content__value'>
            {user.total_orders_placed ?? 0}
          </span>
        </p>
        <p className='content__item'>
          Orders taken:
          <span className='content__value'>{user.total_orders_taken ?? 0}</span>
        </p>
        <p className='content__item'>
          Journeys shared:
          <span className='content__value'>
            {user.total_journeys_shared ?? 0}
          </span>
        </p>
        <p className='content__item'>
          Journeys joined:
          <span className='content__value'>
            {user.total_journeys_joined ?? 0}
          </span>
        </p>
      </div>
    </article>
  );
}
