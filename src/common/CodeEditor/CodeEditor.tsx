import React, { useState } from 'react'
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/ext-beautify"
import { axiosInstance } from '../../configs/axios';
import './CodeEditorStyle.css'
import { CodeOutlined, PlayCircleFilled } from '@ant-design/icons';
import { Select, Slider, Tooltip } from 'antd';
import { Loading } from '../Loading/Loading';

interface CodeEditorProps {
    userCode: string;
    setUserCode: (value: string) => void;
    setUserCodeLang?: (value: string) => void;
}

export const CodeEditor = ({ userCode, setUserCode }: CodeEditorProps) => {
    // State variable to set users source code
    const [userLang, setUserLang] = useState("python");
    const [userTheme, setUserTheme] = useState("merbivore_soft");
    const [fontSize, setFontSize] = useState(20);
    const [userInput, setUserInput] = useState("");
    const [userOutput, setUserOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiLang, setApiLang] = useState('python');

    const languages = [
        { value: "c|c", label: "C" },
        { value: "c_cpp|cpp", label: "C++" },
        { value: "python|python", label: "Python" },
        { value: "java|java", label: "Java" },
        { value: "javascript|nodejs", label: "Javascript" },
        { value: "php|php", label: "PHP" },
    ];

    const theme = [
        { value: "monokai", label: "Monokai" },
        { value: "github", label: "Github" },
        { value: "merbivore_soft", label: "Merbivore Soft" },
    ];

    const onChangeLanguage = (value: string) => {
        const resultArr = value.split('|');
        setUserLang(resultArr[0]);
        setApiLang(resultArr[1]);
    }

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
            setUserOutput(res.data.output);
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
                <label className='header-label' htmlFor="select-language">Ngôn ngữ: </label>
                <Select
                    id='select-language'
                    className='code-editor-select'
                    menuItemSelectedIcon={<CodeOutlined />}
                    defaultValue="python|python"
                    style={{ width: 120 }}
                    onChange={(v) => onChangeLanguage(v)}
                >
                    {languages.map((item) => {
                        return <Select.Option value={item.value}>{item.label}</Select.Option>
                    })}
                </Select>
                <label className='header-label' htmlFor="select-language">Giao diện: </label>
                <Select
                    className='code-editor-select'
                    menuItemSelectedIcon={<CodeOutlined />}
                    defaultValue="merbivore_soft"
                    style={{ width: 150 }}
                    onChange={(v) => setUserTheme(v)}
                >
                    {theme.map((item) => {
                        return <Select.Option value={item.value}>{item.label}</Select.Option>
                    })}
                </Select>
                <label className='header-label' htmlFor="select-language">Cỡ chữ: </label>
                <Slider step={1} style={{ width: 100 }} defaultValue={20} min={10} max={60} onChange={(value) => setFontSize(value)} />
                <Tooltip placement="rightBottom" title='Chạy code'>
                    <PlayCircleFilled className="run-btn" onClick={() => compileCode()} />
                </Tooltip>
            </div>
            <div className='code-editor-main'>
                <div className="left-container">
                    <AceEditor
                        name='main-editor'
                        fontSize={fontSize}
                        height="calc(100vh - 145px)"
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
                            cursorStyle: 'smooth',
                            enableEmmet: true,
                            tooltipFollowsMouse: true,
                            highlightSelectedWord: true,
                            highlightActiveLine: true,
                        }}
                        value={userCode}

                    />
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
                            {/* <img src={codeGear} alt="Loading..." /> */}
                            <Loading />
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
