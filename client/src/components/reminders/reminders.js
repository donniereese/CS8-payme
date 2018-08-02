import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import { getAllInvoices, getInvoice } from '../../actions/invoices';
import Sidebar from '../sidebar';
// import Dropdown from './dropdown';
import { addReminder, allReminders } from '../../actions/smsReminders';
import RemindForm from './reminderForm';

class Reminders extends Component {
  state = {
    reminder: {
      id: null,
      option: '',
      message: '',
      rPhone: '',
    },
    date: new Date(),
  };

  componentDidMount() {
    this.props.getAllInvoices();
    this.props.allReminders();
  }

  onChange = date => this.setState({ date });

  handleInvoice(id, phone) {
    this.setState(state => ({
      ...state,
      reminder: {
        ...state.reminder,
        ...id,
        ...phone,
      },
    }));
  }

  handleChange(e) {
    this.setState(state => ({
      ...state,
      reminder: {
        ...state.reminder,
        ...e,
      },
    }));
  }

  render() {
    const { invoices } = this.props;
    const { reminder } = this.state;
    console.log(reminder);
    return (
      <div className="reminder">
        <Sidebar />
        <div>
          <Calendar onChange={this.onChange} value={this.state.date} />
        </div>
        <div className="reminder-container">
          <div className="reminder-drop" />
          <div>
            <RemindForm
              handleMessage={e => this.handleChange({ message: e.target.value })}
              handleRadio={e => this.handleChange({ option: e.target.value })}
              option={reminder.option}
              invoices={invoices}
              getInvoice={(id, phone) => this.handleInvoice({ id, rPhone: phone })}
              formData={reminder}
              history={this.props.history}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    invoices: state.invoice.invoices,
    invoice: state.invoice.currentInvoice,
    message: state.invoice.success,
    reminders: state.reminder.reminders,
  };
};

export default connect(
  mapStateToProps,
  {
    getAllInvoices,
    getInvoice,
    addReminder,
    allReminders,
  },
)(Reminders);
