import styled from 'styled-components';

import Button from './Button';

const Modal = (props) =>{

  return (
    // 모달 창 외부 클릭 시 닫힘
    <ModalContainer onClick={()=>props.setModal(false)}> 
    {/*/모달 창 내부에서 닫히지 않도록 이벤트 버블링 방지 */}
      <ModalWrapper onClick={e => e.stopPropagation()}>
      <div className='title_frame'>
        <div className="title">{props.title}</div>
        <div className='cancle_button' onClick={()=>props.setModal(false)}>❌</div>
      </div>
      <div className="content">{props.content}</div>
      <div className='submit_frame'>
        <p onClick={props.handleClear}>
        <Button className="btn" buttonName={props.buttonName} >{props.buttonName}</Button>
        </p>
        <div className="cancle_text"  onClick={()=>props.setModal(false)}>Cancle</div>
      </div>
      </ModalWrapper>
    </ModalContainer>
  )
}

export default Modal;

const ModalContainer = styled.div`
  background: rgba(0,0,0,.5);
  /* display: none; */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
`

const ModalWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
    transform: translate(-50%, -50%);
  max-width: 100%;
  width:430px;
  height:125px;

  z-index:1050;
  
  display: flex;
  flex-direction: column;
  
  padding:24px;
  font-size: 13px;
  line-height: 17px;
  background-color: #fff;
  border-radius:7px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 4px 0px, rgba(0, 0, 0, 0.09) 0px 3px 8px 0px, rgba(0, 0, 0, 0.13) 0px 4px 13px 0px;
  > .title_frame{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
   margin-bottom: 16px;
   width:432px;
   height: 31px;
    font-size:13px;
    > .title {
      color: #c22e32;
      font-size:27px;
      line-height: 32px;
      font-weight: 400;
      ;
    }
    > .cancle_button{
      width:13px;
      height: 13px;
      color:#6a737c;
      cursor: pointer;
      margin-top:4px;
      ;
    }
  }
  > .content{
    width:432px;
    height:16px;
    margin-bottom:24px;
    
      line-height: 17px;
      color:#3b4045;
  }
  > .submit_frame {
    display: flex;
    flex-direction: row;
    > p >  .btn{
      background-color: #d0393e;
       line-height: 10px;
       box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
      padding:10px;
        margin: 4px;
      &:hover{
        background-color: #c22e32;
      }
    }
    > .cancle_text{
        width:64px;
        padding:10px;
        margin: 4px;
        font-size:13px;
        line-height: 15px;
        text-align: center;
        border-radius: 3px;
       color:#6a737c;
       cursor: pointer;
       &:hover{
        color:#525960;
        background-color: #f8f9f9;
    
        box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
   
       }
    }
  }
  
  `
