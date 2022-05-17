import React, { useEffect, useState } from 'react'
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/ext-beautify"
import { axiosInstance } from '../../configs/axios';
import './CodeEditorStyle.css'
import codeGear from '../../assets/svg/code-gear.svg';
import { Select } from 'antd';

interface CodeEditorProps {
    userCode: string;
    setUserCode: (value:string) => void;
}

export const CodeEditor = ({userCode, setUserCode}: CodeEditorProps) => {
    // State variable to set users source code
    const [userLang, setUserLang] = useState("python");
    const [userTheme, setUserTheme] = useState("monokai");
    const [fontSize, setFontSize] = useState(20);
    const [userInput, setUserInput] = useState("");
    const [userOutput, setUserOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiLang, setApiLang] = useState('');

    const languages = [
		{ value: "c", label: "C" },
		{ value: "c_cpp", label: "C++" },
		{ value: "python", label: "Python" },
		{ value: "java", label: "Java" },
		{ value: "javascript", label: "Javascript" },
	];

    useEffect(() => {
        switch (userLang) {
            case 'c':
                setApiLang('c')
                break;
            case 'c_cpp':
                setApiLang('cpp')
                break;
            case 'python':
                setApiLang('py')
                break;
            case 'java':
                setApiLang('java')
                break;
            default:
                break;
        }
    }, [userLang])

    const compileCode = () => {
        setLoading(true);
        if (userCode === ``) {
            return
        }
        axiosInstance.post(`https://code-ide-forum.herokuapp.com/api/compiler`, {
            code: userCode,
            language: apiLang,
            input: userInput
        }).then((res) => {
            console.log(res)
            setUserOutput(res.data.data.code_compile);
        }).then(() => {
            setLoading(false);
        })
    }

    const clearOutput = () => {
        setUserOutput("");
    }
    return (
        <div className='main'>
            <div className='code-editor-header'>
                <Select defaultValue="python" style={{ width: 120 }} onChange={(v) => setUserLang(v)}>
                    {languages.map((item)=>{
                        return <Select.Option value={item.value}>{item.label}</Select.Option>
                    })}
                </Select></div>
            <div className='code-editor-main'>
                <div className="left-container">
                    <AceEditor
                        name='main-editor'
                        fontSize={fontSize}
                        height="calc(100vh - 50px)"
                        width="100%"
                        wrapEnabled={true}
                        mode={userLang}
                        theme={userTheme}
                        onChange={(value) => { setUserCode(value) }}
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            spellcheck: true,
                            behavioursEnabled: true,
                        }}
                    />
                    <button className="run-btn" onClick={() => compileCode()}>
                        Run
                    </button>
                </div>
                <div className="right-container">
                    <h4>Input:</h4>
                    <div className="input-box">
                        <textarea id="code-inp" onChange=
                            {(e) => setUserInput(e.target.value)}>
                        </textarea>
                    </div>
                    <h4>Output:</h4>
                    {loading ? (
                        <div className="spinner-box">
                            <img src={codeGear} alt="Loading..." />
                        </div>
                    ) : (
                        <div className="output-box">
                            <pre>{userOutput}</pre>
                            <button onClick={() => { clearOutput() }}
                                className="clear-btn">
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}
