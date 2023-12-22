import Link from 'next/link';
import React, { useState } from 'react';
import ErrPageContent from '../component/errPageContent';

export default function Custom500() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ErrPageContent
      code='500'
      message='Internal Server Error'
      detail={
        <>
          <p>技術的な問題が発生しています。<br />ご不便をおかけし大変申し訳ございません。</p>
          <p>正常にご覧いただけるよう解決に取り組んでいます。</p>
          <p>しばらく経ってもご覧いただけない場合、お手数ですが、<Link href='https://forms.gle/ChWciTT94TfAHCHP8' style={{ textDecoration: 'underline' }}>キャラファンサポート</Link>までお問い合わせください。</p>
        </>
      }
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  )
}
