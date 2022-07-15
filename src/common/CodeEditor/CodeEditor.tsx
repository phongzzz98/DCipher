import React, { useEffect, useState } from 'react'
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
import { Form, Select, Slider, Tooltip } from 'antd';
import { Loading } from '../Loading/Loading';

interface CodeEditorProps {
    userCode: string;
    setUserCode: (value: string) => void;
    userCodeLang?: string;
    setUserCodeLang: (value: string) => void;
    setOuterAPILang?: (value: string) => void;
}

export const CodeEditor = ({ userCode, setUserCode, userCodeLang, setUserCodeLang, setOuterAPILang }: CodeEditorProps) => {
    // State variable to set users source code
    const [userLang, setUserLang] = useState("python");
    const [userTheme, setUserTheme] = useState("merbivore_soft");
    const [fontSize, setFontSize] = useState(16);
    const [userInput, setUserInput] = useState("");
    const [userOutput, setUserOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiLang, setApiLang] = useState('python');
    const [defaultOption, setDefaultOption] = useState('python|python')

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    useEffect(() => {
        let option: {
            value: string;
            label: string;
        } | undefined
        if (userCodeLang !== undefined) {
            option = languages.find((lang) => lang.value.split('|')[0] === userCodeLang)
            if (option !== undefined) {
                setDefaultOption(option?.value)
                setUserLang(option.value.split('|')[0])
                setApiLang(option.value.split('|')[1])
                if (setOuterAPILang)
                    setOuterAPILang(option.value.split('|')[1])
            } else {
                setDefaultOption('python|python')
                setUserLang('python')
                setApiLang('python')
                if (setOuterAPILang)
                    setOuterAPILang('python')
            }
        }
    }, [languages, setOuterAPILang, userCodeLang])

    const onChangeLanguage = (value: string) => {
        const resultArr = value.split('|');
        console.log(resultArr);
        setUserLang(resultArr[0]);
        setApiLang(resultArr[1]);
        if (setOuterAPILang)
            setOuterAPILang(resultArr[1])
        setUserCodeLang(resultArr[0]);
        setDefaultOption(value);
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
                <Form className='code-editor-header-form'>
                    <Form.Item name='language-select' className='code-editor-form-item'>
                        <div>
                            <label className='header-label' htmlFor="select-language">Ngôn ngữ: </label>
                        </div>
                        <Select
                            id='select-language'
                            menuItemSelectedIcon={<CodeOutlined />}
                            value={defaultOption ? defaultOption : 'python|python'}
                            style={{ width: 120 }}
                            onChange={(v) => onChangeLanguage(v)}
                            size={'small'}
                        >
                            {languages.map((item) => {
                                return <Select.Option value={item.value}>{item.label}</Select.Option>
                            })}
                        </Select>

                    </Form.Item>
                    <Form.Item name='theme-select' className='code-editor-form-item'>
                        <div>
                            <label className='header-label' htmlFor="select-language">Giao diện: </label>
                        </div>
                        <Select
                            menuItemSelectedIcon={<CodeOutlined />}
                            defaultValue="merbivore_soft"
                            style={{ width: 150 }}
                            onChange={(v) => setUserTheme(v)}
                            size={'small'}
                        >
                            {theme.map((item) => {
                                return <Select.Option value={item.value}>{item.label}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item className='code-editor-form-item'>
                        <div>
                            <label className='header-label' htmlFor="select-language">Cỡ chữ: </label>
                        </div>
                        <Slider step={1} style={{ width: 120, height: 6, marginTop: 4 }} defaultValue={16} min={10} max={60} onChange={(value) => setFontSize(value)} />
                    </Form.Item>
                    <Form.Item className='code-editor-form-item'>
                        <Tooltip placement="rightBottom" title='Chạy code'>
                            <PlayCircleFilled className="run-btn" onClick={() => compileCode()} />
                        </Tooltip>

                    </Form.Item>
                </Form>
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
                    <div className='input-container'>
                        <h4>Input:</h4>
                        <div className="input-box">
                            <textarea id="code-inp" onChange=
                                {(e) => setUserInput(e.target.value)}>
                            </textarea>
                        </div>
                    </div>
                    <div className='output-container'>
                        <h4>Output:</h4>
                        {loading ? (
                            <div className="spinner-box">
                                <Loading />
                            </div>
                        ) : (
                            <div className="output-box">
                                <div>
                                    <pre>{userOutput}</pre>
                                </div>
                                <button onClick={() => { clearOutput() }}
                                    className="clear-btn">
                                    Clear
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}
