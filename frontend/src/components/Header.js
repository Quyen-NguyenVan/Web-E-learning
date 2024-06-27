import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
class Header extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div className="header-logo">Logo</div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">Chức năng
                                <div className="features-header"></div>
                                <ul className="features-list">
                                    <li><a href="#feature1">Chức năng 1</a></li>
                                    <li><a href="#feature2">Chức năng 2</a></li>
                                    <li><a href="#feature3">Chức năng 3</a></li>
                                </ul>
                            </div>
                            <div className="child-content">Hướng dẫn</div>
                            <div className="child-content">Liên hệ</div>
                        </div>
                        <div className="right-content">
                            <div className="child-content-right">Thông tin người dùng</div>
                            <div className="child-content-right log-out">Đăng xuất</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    title: state.title, // Đảm bảo rằng bạn có reducer cho 'title'
});

export default connect(mapStateToProps)(Header);