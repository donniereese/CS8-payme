import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Sidebar from '../sidebar/';
import { changePassword } from '../../actions/auth';


class Settings extends Component {
  state = {
    error: '',
  }

  handleFormSubmit = (ele) => {
    if (ele.password !== ele.newPassword) {
      this.setState({ error: 'Passwords do not match' });
    }
    this.props.changePassword(ele, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="settings">
        <Sidebar />
        <div className="settings-container">
          <div className="settings-navigation">
            <p className="settings-navigation_password">Change <br />Password <i className="fas fa-key" /></p>
            <p className="setting-line" />
            <p className="settings-navigation_themes">
              Themes
              <i className="fas fa-pencil-alt fa-fw" />
              <br />
            </p>
          </div>
          <div className="settings-form">
            <h1>Change Password</h1>
            <p>{this.state.error}</p>
            <form className="add-invoice" onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                type="email"
                name="email"
                component='input'
                className="settings_field"
                placeholder="Email"
                required
              />
              <br />
              <Field
                name="currentPassword"
                component='input'
                className="settings_field"
                placeholder="Password"
                required
              />
              <br />
              <Field
                name="password"
                component='input'
                className="settings_field"
                placeholder="New Password"
                required
              />
              <Field
                name="newPassword"
                component='input'
                className="settings_field"
                placeholder="Confirm Password"
                required
              />
              <br />
              <button
                className="settings_submit"
                type="submit"
                value="Submit"
              >Change Password
              </button>
            </form>
            <h3>{this.props.success}</h3>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    success: state.auth.success,
  };
};

const Config = (connect(mapStateToProps, { changePassword })(Settings));

export default reduxForm({
  form: 'ChangeCredentials', // Unique name for the form
})(Config);
