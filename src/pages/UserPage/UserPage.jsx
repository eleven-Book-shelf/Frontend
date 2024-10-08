import React, { useCallback, useEffect, useState } from 'react';
import styles from './UserPage.module.css';
import axiosInstance from '../../api/axiosInstance';
import PostList from '../../tool/PostList/PostList';
import { useParams } from "react-router-dom";

const UserPage = () => {
    const [profile, setProfile] = useState(null);
    const { userId } = useParams();
    const [recentPosts, setRecentPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 4;
    const asc = false; // 오름차순 여부를 결정하는 변수 (필요에 따라 true로 변경 가능)

    const fetchUserData = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/api/user/${userId}`);
            setProfile(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    }, [userId]);

    const fetchRecentPosts = useCallback(async () => {
        try {
            const postsResponse = await axiosInstance.get(`/api/user/${userId}/posts`, {
                params: {
                    page: currentPage - 1, // 0부터 시작하는 페이지 인덱스
                    pagesize: pageSize,
                    asc: asc
                },
                headers: { Authorization: `${localStorage.getItem('Authorization')}` }
            });

            // 응답 데이터 구조에 맞게 수정
            setRecentPosts(Array.isArray(postsResponse.data.responseDtoList) ? postsResponse.data.responseDtoList : []);
            setTotalPages(postsResponse.data.totalPages);

        } catch (error) {
            console.error('Failed to fetch recent posts:', error);
            setRecentPosts([]);
        }
    }, [userId, currentPage, pageSize, asc]);

    useEffect(() => {
        fetchUserData();
        fetchRecentPosts();
    }, [currentPage, fetchUserData, fetchRecentPosts]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'NORMAL':
                return styles.statusNormal;
            case 'DELETED':
                return styles.statusDeleted;
            case 'BLOCKED':
                return styles.statusBlocked;
            default:
                return '';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'NORMAL':
                return '활동중';
            case 'DELETED':
                return '탈퇴함';
            case 'BLOCKED':
                return '차단됨';
            default:
                return '';
        }
    };

    const getRoleClass = (role) => {
        switch (role) {
            case 'USER':
                return styles.roleUser;
            case 'ADMIN':
                return styles.roleAdmin;
            default:
                return '';
        }
    };

    return (
        <div className={styles.container}>
            {profile && (
                <div className={styles.profileHeader}>
                    <h1>{profile.nickname}</h1>
                    <div>
                        <button className={`${styles.statusButton} ${getStatusClass(profile.status)}`}>
                            <span>{getStatusText(profile.status)}</span>
                        </button>
                        {profile.role === 'ADMIN' && (
                            <button className={`${styles.roleButton} ${getRoleClass(profile.role)}`}>
                                <span>{profile.role}</span>
                            </button>
                        )}
                    </div>
                    <p>Member since: {new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>
            )}

            <div className={styles.section}>
                <h2>최근 작성한 게시글</h2>
                <PostList
                    posts={recentPosts}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageClick={handlePageClick}
                />
            </div>
        </div>
    );
};

export default UserPage;
