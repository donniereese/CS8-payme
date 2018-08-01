import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';
import { handleInvoiceIdx, getPdf } from '../../../actions/invoices';
import { getReminder, deleteSms } from '../../../actions/smsReminders';
// import Pdf from './pdf';

const Datainvoice = SortableElement(props => {
  return (
    <React.Fragment>
      {props.boxView || props.isDesktop? (
        <div className="invoice-data">
          <div
            className="invoice-data-flex"
            onClick={() => props.handleInvoiceIdx(props.invoiceID, props.history)}
          >
            <p className="invoice-data-id">#{props.invoiceID}</p>
            <i className="far fa-edit" />
          </div>
          <p className="invoice-data-name">{props.clientName}</p>
          <p className="invoice-data-company">{props.company}</p>
          <p>
            <span className="invoice-data-pdf" onClick={() => props.togglePdf(props.invoiceID, 'showpdf')}> 
              {' '}
              Invoice PDF<i className="fas fa-paperclip" />
            </span>
          </p>
          {props.isPdfToggled ? props.history.push('/pdf') : null}
          <hr className="invoice-data-hr" />
          <div>
            {props.reminder.map((r, i) => {
              return (
                <div key={i}>
                  {r.invoiceId === props.id ? (
                    <div>
                      <p className="invoice-list-reminder">{r.remind}</p>

                      <i className="fas fa-mobile-alt" style={{ marginLeft: '0.5rem' }} />
                      <button type="submit" onClick={() => props.deleteSms(r._id, props.history)}>
                        <i className="fa fa-bell-slash" />
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
            {/* <i className="far fa-envelope" style={{ marginLeft: '0.5rem' }} />; */}
          </div>
        </div>

      ) :
      (
        <div className="invoice-list">
          <div className="invoice-list-box" >
            <p className="invoice-list-id"
              onClick={() => props.handleInvoiceIdx(props.invoiceID, props.history)}>
              #{props.invoiceID}
            </p>
          </div>
          <div className="invoice-list-box" >
            <p className="invoice-list-box_name">{props.clientName}</p>
          </div>
          <div className="invoice-list-box" >
            <p className="invoice-list-company">{props.company}</p>
          </div>
          <div className="invoice-list-box" >
            <span className="invoice-list-pdf"
              onClick={() => props.togglePdf(props.invoiceID, 'showpdf')}> 
              Invoice PDF
              <i className="fas fa-paperclip"></i>
            </span>
          </div>
          <div className="invoice-list-box" >
            <p className="invoice-list-reminder">Weekly
            <i className="far fa-envelope" style={{marginLeft: '0.5rem'}}></i>
            <i className="fas fa-mobile-alt"  style={{marginLeft: '0.5rem'}}></i>
            </p>
          </div>
          <div>
            {props.isPdfToggled ? (
              props.history.push('/pdf')
            ) : null}
          </div>
          {/* reminders */}

          <div>
            {props.reminder.map((r, i) => {
              return (
                <div key={i}>
                  {r.invoiceId === props.id ? (
                    <div>
                      <p className="invoice-list-reminder">{r.remind}</p>
                      <i className="fas fa-mobile-alt" style={{ marginLeft: '0.5rem' }} />
                      <button type="submit" onClick={() => props.deleteSms(r._id, props.history)}>
                        <i className="fa fa-bell-slash" />
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
            {/* <i className="far fa-envelope" style={{ marginLeft: '0.5rem' }} />; */}
          </div>

          <div>{props.isPdfToggled ? props.history.push('/pdf') : null}</div>
        </div>
      )}
    </React.Fragment>
  );
});

const mapStateToProps = state => {
  return {
    success: state.invoice.success,
    reminders: state.reminder.reminders,
  };
};

export default connect(
  mapStateToProps,
  {
    handleInvoiceIdx,
    getPdf,
    getReminder,
    deleteSms,
  },
)(Datainvoice);
