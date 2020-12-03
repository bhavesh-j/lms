import AbstractComponent from '../abstract/abstract.component';
import '../leavingCertificate/leaveCerti.css';

class LeaveCerti extends AbstractComponent{
  
  constructor(){
    super()
    this.printLeavingCertificate = this.printLeavingCertificate.bind(this);
  }

  printLeavingCertificate(){
    const cssstring = `<style>
    
    .leave-certi {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 17px;
      font-weight: normal;
  }
  
  .leave-certi input {
      font-size: 16px;
      font-weight: bold;
  }
  
  .leave-certi input:focus {
          outline: none;
      }
  
  .leave-certi .wrapper {
      width: 800px;
      margin: auto;
      padding: 20px 0px;
  }
  
  .leave-certi .date {
      width: 300 px;
      float: right;
  }
  
      .leave-certi .date > div {
          float: right;
      }
  
      .leave-certi .date input {
          border: none;
          border-bottom: 1px solid #000;
          padding: 4px 6px;
          width: 20px;
      }
  
          .leave-certi .date input:last-child {
              width: 40px;
          }
  
  .leave-certi .wrapper_body h3 {
      text-align: center;
      margin-top: 140px;
      margin-bottom: 50px;
      text-transform: uppercase;
      font-weight: normal;
      font-size: 24px;
  }
  
  .leave-certi .wrapper_body p {
      line-height: 36px;
      font-weight: bold;
  }
  
  .leave-certi .txt_fld {
      border: none;
      border-bottom: 1px solid #000;
      padding: 4px 6px;
  }
  
  .sign {
      font-size: 22px;
      margin-top: 120px;
  }
  .btn-style{
      margin-top:20px;
      float:right;
      margin-right:10px;
  }
  </style>`
    this.printDocument('leave-certi',cssstring)
  }
    render(){
        return (
          <div id="leave-certi">
            <div className="leave-certi container">
              <div className="card">
                <div className="wrapper_body">
                  <div>
                    <div>
                      <button type="button" className="btn btn-success btn-style" id="btn-print" onClick={this.printLeavingCertificate}>Print</button>
                    </div>
                  </div>
                  <div className="col-12 ml-4">
                    <h3>School&nbsp; Leaving&nbsp; Certificate</h3>
                    <div>
                      <div className="date">
                        <span>Date:</span>
                        <input type="text" defaultValue="03/12/2020" style={{width: '70%'}} />
                      </div>
                      <br />
                      <br />
                      <p>This is to certify that 
                        <input type="text" style={{textAlign: 'center', width: '18%'}} defaultValue="Ranchhod Das Chanchad" className="txt_fld" />
                        Daughter/Son of 
                        <input type="text" style={{textAlign: 'center', width: '18%'}} defaultValue="Shamal Das Chanchad" className="txt_fld" />
                        attending this School from
                        <input type="text" defaultValue="03/11/2020" className="txt_fld" style={{width: '100px', textAlign: 'center'}} />
                        to
                        <input type="text" defaultValue="03/11/2020" className="txt_fld" style={{width: '100px', textAlign: 'center'}} />
                        and now leaves the School having paid all dues to date.<br />
                        His/Her date of birth as per School records is (in figures)
                        <input type="text" defaultValue="03/11/2020" className="txt_fld" style={{width: '100px', textAlign: 'center'}} />
                        in words
                        <input type="text" defaultValue="Third November Two-Thousands Twenty" className="txt_fld" style={{width: '45%'}} />
                        Last Examination passed by him/her was that of class
                        <input type="text" defaultValue="I / A " className="txt_fld" style={{width: '20%', textAlign: 'center'}} /> 
                        Now he/she is in class
                        <input type="text" defaultValue="I / A " className="txt_fld" style={{width: '20%', textAlign: 'center'}} /> 
                        His/Her conduct is 
                        <input type="text" defaultValue="Good" className="txt_fld" style={{width: '25%'}} />
                        . Her Date of Birth as per school record is  
                        <input type="text" defaultValue="03/11/2020" className="txt_fld" style={{width: '100px', textAlign: 'center'}} />
                        .</p>
                      <div className="sign">
                        <span>Principal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </div>
          );
        };
    }

export default LeaveCerti;    