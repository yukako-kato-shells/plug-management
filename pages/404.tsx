import React, { useState } from 'react';
import ErrPageContent from '../component/errPageContent';

export default function Custom404() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ErrPageContent
      code='404'
      message='Page Not Found'
      detail='お探しのページは見つかりませんでした。削除されたか、URLが間違っている可能性があります。'
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  )
}
