import { Fragment, useState, ReactElement, Dispatch as D, SetStateAction as S, MouseEvent } from 'react';
import type { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, Select, InputNumber, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { Store as FormStore } from 'antd/es/form/interface';
import style from './addForm.sass';
import { rStr } from '../../../utils/utils';
import { parseVideoUrl, parseAudioUrl, parseBangumiVideo } from './parseBilibiliUrl';
import { setAddDownloadList } from '../reducers/download';

/* 添加下载信息 */
function AddForm(props: {}): ReactElement {
  const dispatch: Dispatch = useDispatch();
  const [visible, setVisible]: [boolean, D<S<boolean>>] = useState(false);
  const [loading, setLoading]: [boolean, D<S<boolean>>] = useState(false);
  const [form]: [FormInstance] = Form.useForm();

  // 确定添加视频
  async function handleAddDownloadQueueClick(event: MouseEvent<HTMLButtonElement>): Promise<void> {
    let formValue: FormStore;

    try {
      formValue = await form.validateFields();
    } catch (err) {
      return console.error(err);
    }

    setLoading(true);

    try {
      let result: string | void;

      if (formValue.type === 'au') {
        // 下载音频
        result = await parseAudioUrl(formValue.id);
      } else if (formValue.type === 'ss' || formValue.type === 'ep') {
        // 下载番剧
        result = await parseBangumiVideo(formValue.type, formValue.id);
      } else {
        // 下载av、bv视频
        result = await parseVideoUrl(formValue.type, formValue.id, formValue.page);
      }

      if (result) {
        dispatch(setAddDownloadList({
          qid: rStr(30),
          durl: result,
          type: formValue.type,
          id: formValue.id,
          page: formValue.page ?? 1
        }));
        setVisible(false);
      } else {
        message.warn('没有获取到媒体地址！');
      }
    } catch (err) {
      message.error('地址解析失败！');
      console.error(err);
    }

    setLoading(false);
  }

  // 关闭窗口后重置表单
  function handleAddModalClose(): void {
    form.resetFields();
  }

  // 打开弹出层
  function handleOpenAddModalClick(event: MouseEvent<HTMLButtonElement>): void {
    setVisible(true);
  }

  // 关闭弹出层
  function handleCloseAddModalClick(event: MouseEvent<HTMLButtonElement>): void {
    setVisible(false);
  }

  return (
    <Fragment>
      <Button type="primary" onClick={ handleOpenAddModalClick }>添加下载任务</Button>
      <Modal visible={ visible }
        title="添加下载任务"
        width={ 480 }
        centered={ true }
        maskClosable={ false }
        confirmLoading={ loading }
        afterClose={ handleAddModalClose }
        onOk={ handleAddDownloadQueueClick }
        onCancel={ handleCloseAddModalClick }
      >
        <Form className={ style.formContent }
          form={ form }
          initialValues={{ type: 'bv' }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item name="type" label="下载类型">
            <Select>
              <Select.Option value="bv">视频（BV）</Select.Option>
              <Select.Option value="av">视频（av）</Select.Option>
              <Select.Option value="au">音频（au）</Select.Option>
              <Select.Option value="ep">番剧（ep）</Select.Option>
              <Select.Option value="ss">番剧（ss）</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="id" label="ID" rules={ [{ required: true, message: '必须输入视频ID', whitespace: true }] }>
            <Input />
          </Form.Item>
          <Form.Item name="page" label="Page">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
}

export default AddForm;