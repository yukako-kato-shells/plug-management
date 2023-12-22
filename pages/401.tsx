import React, { useState } from 'react';
import ErrPageContent from '../component/errPageContent';

export default function Custom404() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ErrPageContent
      code='401'
      message='Unauthorized'
      detail='認証に失敗しました。ログインしているアカウントをお確かめください。'
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  )
}
