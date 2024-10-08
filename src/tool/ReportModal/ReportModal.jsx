import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../../api/axiosInstance';
import '../TagSearch/TagSearch.css';

const ReportModal = ({ postId, commentId, onClose, isVisible }) => {
    const [reportTitle, setReportTitle] = useState('');
    const [reportContent, setReportContent] = useState('');

    const handleReport = async () => {
        const headers = { Authorization: `${localStorage.getItem('Authorization')}` };
        try {
            await axiosInstance.post(`/api/report`, {
                title: reportTitle,
                content: reportContent
            }, {
                params: {
                    postId: postId,
                    commentId: commentId
                },
                headers
            });
            alert('신고가 접수되었습니다.');
            onClose();
        } catch (error) {
            console.error('There was an error reporting the post!', error);
            alert('신고 접수 중 오류가 발생했습니다.');
        }
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal-button" onClick={onClose}>
                    닫기
                </button>
                <div className="modal-content">
                    <h3>게시글 신고</h3>
                    <input
                        type="text"
                        placeholder="신고 제목"
                        value={reportTitle}
                        onChange={(e) => setReportTitle(e.target.value)}
                        className="search-input"
                    />
                    <textarea
                        placeholder="신고 내용"
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        className="search-input"
                    />
                    <div className="modal-actions">
                        <button onClick={handleReport} className="search-button">
                            신고 접수
                        </button>
                        <button onClick={onClose} className="tag-button">
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ReportModal.propTypes = {
    postId: PropTypes.number,
    commentId: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
};

export default ReportModal;
