import { Fragment, useState, ReactElement, Dispatch as D, SetStateAction as S, MouseEvent } from 'react';
import { Button, Modal } from 'antd';
import Icon from '@ant-design/icons';
import Qrcode from './Qrcode';
import { ReactComponent as AcFunTvSvgComponent } from './images/CN_acfun.tv.svg';

/* AcFun扫码登陆 */
function AcFunLogin(props: {}): ReactElement {
  const [visible, setVisible]: [boolean, D<S<boolean>>] = useState(false);

  // 打开扫码弹出层
  function handleOpenQrcodeClick(event: MouseEvent<HTMLButtonElement>): void {
    setVisible(true);
  }

  // 关闭扫码弹出层
  function handleCloseQrcodeClick(event: MouseEvent<HTMLButtonElement>): void {
    setVisible(false);
  }

  return (
    <Fragment>
      <Button icon={ <Icon component={ AcFunTvSvgComponent } /> } onClick={ handleOpenQrcodeClick }>
        A站账号扫码登陆
      </Button>
      <Modal visible={ visible }
        title="A站账号扫码登陆"
        width={ 600 }
        centered={ true }
        destroyOnClose={ true }
        footer={ <Button onClick={ handleCloseQrcodeClick }>关闭</Button> }
        onCancel={ handleCloseQrcodeClick }
      >
        <Qrcode onCancel={ handleCloseQrcodeClick } />
      </Modal>
    </Fragment>
  );
}

export default AcFunLogin;