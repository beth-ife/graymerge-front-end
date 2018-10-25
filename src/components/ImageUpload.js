import React, {Component} from 'react';
import {Upload, Icon, Modal} from 'antd';
import {base_url} from "../global/api_calls";

class ImageUpload extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        files_to_upload: []
    };

    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({fileList}) => this.setState({fileList}, () => {
        let files = JSON.parse(JSON.stringify(this.state.files_to_upload));
        fileList.map(file => {
            console.log(JSON.parse(JSON.stringify(file)))
            if (file && file.response && file.response.file) {
                ;
                this.props.setProductImages(files.concat(file.response.file));
                this.setState({files_to_upload: files})
            }
        })
        console.log(fileList)
    })

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    multiple={true}
                    action={base_url + '/upload-image'}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 5 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="image" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

export default ImageUpload