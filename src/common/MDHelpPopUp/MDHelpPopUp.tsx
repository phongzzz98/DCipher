import { Button, Collapse, Modal } from 'antd'
import { EnterOutlined, BoldOutlined, ItalicOutlined, CodeOutlined, FileImageOutlined, UnorderedListOutlined, OrderedListOutlined, LinkOutlined } from '@ant-design/icons';
import './MDHelpPopUpStyle.css'
import mdParagraph from '../../assets/images/md-paragraph.png'
import mdEmphasize from '../../assets/images/md-emphasize.png'
import mdTitle from '../../assets/images/md-title.png'
import mdBlockquote from '../../assets/images/md-blockquote.png'
import mdList from '../../assets/images/md-list.png'
import mdNestedList from '../../assets/images/md-nestedlist.png'
import mdLink from '../../assets/images/md-link.png'
import mdImage from '../../assets/images/md-image.png'
import mdCode from '../../assets/images/md-code.png'

interface MDHelpPopUpProps {
  helpModalVisible: boolean;
  setHelpModalVisible: Function;
}

export const MDHelpPopUp = ({ helpModalVisible, setHelpModalVisible }: MDHelpPopUpProps) => {

  const handleCancel = () => {
    setHelpModalVisible(false)
  }

  return (
    <Modal
      className='md-help-modal'
      destroyOnClose={true}
      title="Hướng dẫn sử dụng"
      visible={helpModalVisible}
      onCancel={handleCancel}
      width={'75%'}
      style={{ fontFamily: 'SofiaProSemiBold' }}
      footer={<Button type='primary' onClick={handleCancel} >OK</Button>}
    >
      <div className='mdhelp-item'>
        <h3 style={{ fontFamily: 'SofiaProSemiBold' }}>Cách đoạn/Xuống dòng <span className='mdhelp-icon'><EnterOutlined /></span></h3>
        <p>Để ngắt dòng, hãy thêm dấu gạch chéo ngược <code>\</code> hoặc xuống dòng <b>2</b> lần.</p>
        <Collapse style={{ fontFamily: 'SofiaProSemiBold', borderRadius: '5px' }}>
          <Collapse.Panel header="Ví dụ cách đoạn" key="1">
            <img src={mdParagraph} alt="Ví dụ cách đoạn markdown" />
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className='mdhelp-item'>
        <h3 style={{ fontFamily: 'SofiaProSemiBold' }}>Nhấn mạnh <span className='mdhelp-icon'><BoldOutlined /><ItalicOutlined /></span> </h3>
        <p>Để nhấn mạnh bằng chữ nghiêng hoặc đậm, hãy bọc chỗ cần nhấn mạnh bằng dấu hoa thị <code>*</code> (chữ nghiêng), <code>**</code> (chữ in đậm) hoặc dấu gạch dưới <code>_</code> (chữ nghiêng), <code>__</code> (chữ in đậm).
          Để tránh tạo chữ đậm hoặc nghiêng, hãy đặt dấu gạch chéo ngược ở phía trước như sau <code>\*</code> hoặc <code>\_</code>.</p>
        <Collapse style={{ fontFamily: 'SofiaProSemiBold', borderRadius: '5px' }}>
          <Collapse.Panel header="Ví dụ nhấn mạnh" key="1">
            <img src={mdEmphasize} alt="Ví dụ nhấn mạnh markdown" />
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className='mdhelp-item'>
        <h3 style={{ fontFamily: 'SofiaProSemiBold' }}>Tiêu đề <span className='mdhelp-icon'><svg width="20" height="15" viewBox="0 0 520 520"><path fill="currentColor" d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"></path></svg></span> </h3>
        <p>Bắt đầu một dòng với dấu thăng <code>#</code> <b>và</b> một khoảng trắng để tạo nên tiêu đề.
          Càng nhiều <code>#</code>, tiêu đề càng nhỏ.</p>
        <Collapse style={{ fontFamily: 'SofiaProSemiBold', borderRadius: '5px' }}>
          <Collapse.Panel header="Ví dụ tiêu đề" key="1">
            <img src={mdTitle} alt="Ví dụ tiêu đề markdown" />
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className='mdhelp-item'>
        <h3 style={{ fontFamily: 'SofiaProSemiBold' }}>Trích dẫn <span className='mdhelp-icon'><svg width="20" height="15" viewBox="0 0 520 520"><path fill="currentColor" d="M520,95.75 L520,225.75 C520,364.908906 457.127578,437.050625 325.040469,472.443125 C309.577578,476.586875 294.396016,464.889922 294.396016,448.881641 L294.396016,414.457031 C294.396016,404.242891 300.721328,395.025078 310.328125,391.554687 C377.356328,367.342187 414.375,349.711094 414.375,274.5 L341.25,274.5 C314.325781,274.5 292.5,252.674219 292.5,225.75 L292.5,95.75 C292.5,68.8257812 314.325781,47 341.25,47 L471.25,47 C498.174219,47 520,68.8257812 520,95.75 Z M178.75,47 L48.75,47 C21.8257813,47 0,68.8257812 0,95.75 L0,225.75 C0,252.674219 21.8257813,274.5 48.75,274.5 L121.875,274.5 C121.875,349.711094 84.8563281,367.342187 17.828125,391.554687 C8.22132813,395.025078 1.89601563,404.242891 1.89601563,414.457031 L1.89601563,448.881641 C1.89601563,464.889922 17.0775781,476.586875 32.5404687,472.443125 C164.627578,437.050625 227.5,364.908906 227.5,225.75 L227.5,95.75 C227.5,68.8257812 205.674219,47 178.75,47 Z"></path></svg></span> </h3>
        <p>Để tạo một trích dẫn, hãy bắt đầu một dòng với dấu <code>{'>'}</code> theo sau bởi một khoảng trắng tùy chọn. Các dấu <code>{'>'}</code> có thể được lồng vào nhau và cũng có thể chứa các định dạng khác.</p>
        <Collapse style={{ fontFamily: 'SofiaProSemiBold', borderRadius: '5px' }}>
          <Collapse.Panel header="Ví dụ trích dẫn" key="1">
            <img src={mdBlockquote} alt="Ví dụ trích dẫn markdown" />
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className='mdhelp-item'>
        <h3 style={{ fontFamily: 'SofiaProSemiBold' }}>Danh sách <span className='mdhelp-icon'><UnorderedListOutlined /> <OrderedListOutlined /></span> </h3>
        <p>Danh sách không có thứ tự có thể sử dụng dấu hoa thị <code>*</code>, dấu cộng <code>+</code> hoặc dấu gạch nối <code>-</code> làm điểm đánh dấu danh sách.
          Danh sách có thứ tự sử dụng các chữ số theo sau bởi dấu chấm <code>.</code> hoặc dấu ngoặc đơn bên phải <code>)</code> .</p>
        <Collapse style={{ fontFamily: 'SofiaProSemiBold', borderRadius: '5px' }}>
          <Collapse.Panel header="Ví dụ danh sách" key="1">
            <img src={mdList} alt="Ví dụ danh sách markdown" />
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className='mdhelp-item'>
        <h3 style={{ fontFamily: 'SofiaProSemiBold' }}>Lồng danh sách</h3>
        <p>Để lồng một danh sách vào một danh sách khác, hãy thụt lề mỗi mục trong danh sách con 4 dấu cách hoặc 1 lần nhấn <code>Tab</code> .</p>
        <Collapse style={{ fontFamily: 'SofiaProSemiBold', borderRadius: '5px' }}>
          <Collapse.Panel header="Ví dụ danh sách lồng" key="1">
            <img src={mdNestedList} alt="Ví dụ danh sách lồng markdown" />
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className='mdhelp-item'>
        <h3 style={{ fontFamily: 'SofiaProSemiBold' }}>Liên kết <span className='mdhelp-icon'><LinkOutlined /></span> </h3>
        <p>Các liên kết có thể nằm cùng dòng với văn bản hoặc được đặt ở cuối văn bản làm tài liệu tham khảo. Văn bản được nhúng liên kết được bao bởi dấu ngoặc vuông <code>[]</code> và đối với liên kết nội dòng, URL sẽ được bao bởi dấu ngoặc tròn <code>()</code>.</p>
        <Collapse style={{ fontFamily: 'SofiaProSemiBold', borderRadius: '5px' }}>
          <Collapse.Panel header="Ví dụ liên kết" key="1">
            <img src={mdLink} alt="Ví dụ liên kết markdown" />
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className='mdhelp-item'>
        <h3 style={{ fontFamily: 'SofiaProSemiBold' }}>Ảnh <span className='mdhelp-icon'><FileImageOutlined /></span> </h3>
        <p>Tương tự như phần liên kết chỉ có thêm dấu chấm than <code>!</code> ở đầu, tên ảnh được bao bởi dấu ngoặc vuông <code>[]</code> và URL ảnh sẽ được bao bởi dấu ngoặc tròn <code>()</code>.</p>
        <Collapse style={{ fontFamily: 'SofiaProSemiBold', borderRadius: '5px' }}>
          <Collapse.Panel header="Ví dụ ảnh" key="1">
            <img src={mdImage} alt="Ví dụ ảnh markdown" />
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className='mdhelp-item'>
        <h3 style={{ fontFamily: 'SofiaProSemiBold' }}>Code <span className='mdhelp-icon'><CodeOutlined /></span> </h3>
        <p>Để tạo code nội dòng, hãy bọc chỗ cần code bằng dấu huyền <code>`</code>. Để tạo một khối code, hãy thụt lề mỗi dòng 4 dấu cách hoặc đặt 3 dấu huyền <code>```</code> (nên dùng) trên một dòng phía trên và bên dưới khối mã. Và để có highlight code hãy viết tên ngôn ngữ bên cạnh <code>```</code>.</p>
        <Collapse style={{ fontFamily: 'SofiaProSemiBold', borderRadius: '5px' }}>
          <Collapse.Panel header="Ví dụ code" key="1">
            <img src={mdCode} alt="Ví dụ code markdown" />
          </Collapse.Panel>
        </Collapse>
      </div>
    </Modal>
  )
}
