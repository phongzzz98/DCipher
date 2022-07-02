import React, { useState } from 'react'
import { CodeEditor } from '../../common/CodeEditor/CodeEditor'
import './PlaygroundStyle.css'

export const Playground = () => {
  const [userCode, setUserCode] = useState(``);
  return (
    <div className='playground-container'><CodeEditor userCode={userCode} setUserCode={setUserCode} setUserCodeLang={()=>{}}/></div>
  )
}
