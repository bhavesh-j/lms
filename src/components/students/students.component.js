function StateDropdown(props) {
  return (
    <select className="form-control input-height" name={props.name} required>
      <option value>Select State</option>
      <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
      <option value="Andhra Pradesh">Andhra Pradesh</option>
      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
      <option value="Assam">Assam</option>
      <option value="Bihar">Bihar</option>
      <option value="Chandigarh">Chandigarh</option>
      <option value="Chhattisgarh">Chhattisgarh</option>
      <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
      <option value="Daman and Diu">Daman and Diu</option>
      <option value="Delhi">Delhi</option>
      <option value="Goa">Goa</option>
      <option value="Gujarat">Gujarat</option>
      <option value="Haryana">Haryana</option>
      <option value="Himachal Pradesh">Himachal Pradesh</option>
      <option value="Jammu and Kashmir">Jammu and Kashmir</option>
      <option value="Jharkhand">Jharkhand</option>
      <option value="Karnataka">Karnataka</option>
      <option value="Kerala">Kerala</option>
      <option value="Lakshadweep">Lakshadweep</option>
      <option value="Madhya Pradesh">Madhya Pradesh</option>
      <option value="Maharashtra">Maharashtra</option>
      <option value="Manipur">Manipur</option>
      <option value="Meghalaya">Meghalaya</option>
      <option value="Mizoram">Mizoram</option>
      <option value="Nagaland">Nagaland</option>
      <option value="Orissa">Orissa</option>
      <option value="Pondicherry">Pondicherry</option>
      <option value="Punjab">Punjab</option>
      <option value="Rajasthan">Rajasthan</option>
      <option value="Sikkim">Sikkim</option>
      <option value="Tamil Nadu">Tamil Nadu</option>
      <option value="Tripura">Tripura</option>
      <option value="Uttaranchal">Uttaranchal</option>
      <option value="Uttar Pradesh">Uttar Pradesh</option>
      <option value="West Bengal">West Bengal</option>
    </select>
  );
}

function AcademicYear(props) {
  return (
    <select className="form-control input-height" name={props.name} required>
      <option value>Select Year</option>
      <option value="2020">2020</option>
      <option value="2019">2019</option>
      <option value="2018">2018</option>
      <option value="2017">2017</option>
      <option value="2016">2016</option>
      <option value="2015">2015</option>
      <option value="2014">2014</option>
      <option value="2013">2013</option>
      <option value="2012">2012</option>
      <option value="2011">2011</option>
      <option value="2010">2010</option>
      <option value="2009">2009</option>
      <option value="2008">2008</option>
      <option value="2007">2007</option>
      <option value="2006">2006</option>
      <option value="2005">2005</option>
      <option value="2004">2004</option>
      <option value="2003">2003</option>
      <option value="2002">2002</option>
      <option value="2001">2001</option>
      <option value="2000">2000</option>
      <option value="1999">1999</option>
      <option value="1998">1998</option>
      <option value="1997">1997</option>
      <option value="1996">1996</option>
      <option value="1995">1995</option>
      <option value="1994">1994</option>
      <option value="1993">1993</option>
      <option value="1992">1992</option>
      <option value="1991">1991</option>
      <option value="1990">1990</option>
    </select>
  );
}

function Students() {
  return (
    <div className="page">
      {/* Start Page header */}
      <div className="section-body" id="page_top">
        <div className="container-fluid">
          <div className="page-header">
            <div className="left">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="What you want to find" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">Search</button>
                </div>
              </div>
            </div>
            <div className="right">
              <ul className="nav nav-pills">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Pages</a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="page-empty.html">Empty page</a>
                    <a className="dropdown-item" href="page-profile.html">Profile</a>
                    <a className="dropdown-item" href="page-search.html">Search Results</a>
                    <a className="dropdown-item" href="page-timeline.html">Timeline</a>
                    <a className="dropdown-item" href="page-invoices.html">Invoices</a>
                    <a className="dropdown-item" href="page-pricing.html">Pricing</a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Auth</a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="login.html">Login</a>
                    <a className="dropdown-item" href="register.html">Register</a>
                    <a className="dropdown-item" href="forgot-password.html">Forgot password</a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="404.html">404 error</a>
                    <a className="dropdown-item" href="500.html">500 error</a>
                  </div>
                </li>
              </ul>
              <div className="notification d-flex">
                <div className="dropdown d-flex">
                  <a className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown"><i className="fa fa-language" /></a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <a className="dropdown-item" href="#"><img className="w20 mr-2" src="../assets/images/flags/us.svg" alt="" />English</a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#"><img className="w20 mr-2" src="../assets/images/flags/es.svg" alt="" />Spanish</a>
                    <a className="dropdown-item" href="#"><img className="w20 mr-2" src="../assets/images/flags/jp.svg" alt="" />japanese</a>
                    <a className="dropdown-item" href="#"><img className="w20 mr-2" src="../assets/images/flags/bl.svg" alt="" />France</a>
                  </div>
                </div>
                <div className="dropdown d-flex">
                  <a className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown"><i className="fa fa-envelope" /><span className="badge badge-success nav-unread" /></a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <ul className="right_chat list-unstyled w350 p-0">
                      <li className="online">
                        <a href="javascript:void(0);" className="media">
                          <img className="media-object" src="../assets/images/xs/avatar4.jpg" alt="" />
                          <div className="media-body">
                            <span className="name">Donald Gardner</span>
                            <div className="message">It is a long established fact that a reader</div>
                            <small>11 mins ago</small>
                            <span className="badge badge-outline status" />
                          </div>
                        </a>
                      </li>
                      <li className="online">
                        <a href="javascript:void(0);" className="media">
                          <img className="media-object " src="../assets/images/xs/avatar5.jpg" alt="" />
                          <div className="media-body">
                            <span className="name">Wendy Keen</span>
                            <div className="message">There are many variations of passages of Lorem Ipsum</div>
                            <small>18 mins ago</small>
                            <span className="badge badge-outline status" />
                          </div>
                        </a>
                      </li>
                      <li className="offline">
                        <a href="javascript:void(0);" className="media">
                          <img className="media-object " src="../assets/images/xs/avatar2.jpg" alt="" />
                          <div className="media-body">
                            <span className="name">Matt Rosales</span>
                            <div className="message">Contrary to popular belief, Lorem Ipsum is not simply</div>
                            <small>27 mins ago</small>
                            <span className="badge badge-outline status" />
                          </div>
                        </a>
                      </li>
                      <li className="online">
                        <a href="javascript:void(0);" className="media">
                          <img className="media-object " src="../assets/images/xs/avatar3.jpg" alt="" />
                          <div className="media-body">
                            <span className="name">Phillip Smith</span>
                            <div className="message">It has roots in a piece of classical Latin literature from 45 BC</div>
                            <small>33 mins ago</small>
                            <span className="badge badge-outline status" />
                          </div>
                        </a>
                      </li>
                    </ul>
                    <div className="dropdown-divider" />
                    <a href="javascript:void(0)" className="dropdown-item text-center text-muted-dark readall">Mark all as read</a>
                  </div>
                </div>
                <div className="dropdown d-flex">
                  <a className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown"><i className="fa fa-bell" /><span className="badge badge-primary nav-unread" /></a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <ul className="list-unstyled feeds_widget">
                      <li>
                        <div className="feeds-left">
                          <span className="avatar avatar-blue"><i className="fa fa-check" /></span>
                        </div>
                        <div className="feeds-body ml-3">
                          <p className="text-muted mb-0">Campaign <strong className="text-blue font-weight-bold">Holiday</strong> is nearly reach budget limit.</p>
                        </div>
                      </li>
                      <li>
                        <div className="feeds-left">
                          <span className="avatar avatar-green"><i className="fa fa-user" /></span>
                        </div>
                        <div className="feeds-body ml-3">
                          <p className="text-muted mb-0">New admission <strong className="text-green font-weight-bold">32</strong> in computer department.</p>
                        </div>
                      </li>
                      <li>
                        <div className="feeds-left">
                          <span className="avatar avatar-red"><i className="fa fa-info" /></span>
                        </div>
                        <div className="feeds-body ml-3">
                          <p className="text-muted mb-0">6th sem result <strong className="text-red font-weight-bold">67%</strong> in computer department.</p>
                        </div>
                      </li>
                      <li>
                        <div className="feeds-left">
                          <span className="avatar avatar-azure"><i className="fa fa-thumbs-o-up" /></span>
                        </div>
                        <div className="feeds-body ml-3">
                          <p className="text-muted mb-0">New Feedback <strong className="text-azure font-weight-bold">53</strong> for university assessment.</p>
                        </div>
                      </li>
                    </ul>
                    <div className="dropdown-divider" />
                    <a href="javascript:void(0)" className="dropdown-item text-center text-muted-dark readall">Mark all as read</a>
                  </div>
                </div>
                <div className="dropdown d-flex">
                  <a href="javascript:void(0)" className="chip ml-3" data-toggle="dropdown">
                    <span className="avatar" style={{ backgroundImage: 'url(../assets/images/xs/avatar5.jpg)' }} /> George</a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <a className="dropdown-item" href="page-profile.html"><i className="dropdown-icon fe fe-user" /> Profile</a>
                    <a className="dropdown-item" href="app-setting.html"><i className="dropdown-icon fe fe-settings" /> Settings</a>
                    <a className="dropdown-item" href="app-email.html"><span className="float-right"><span className="badge badge-primary">6</span></span><i className="dropdown-icon fe fe-mail" /> Inbox</a>
                    <a className="dropdown-item" href="javascript:void(0)"><i className="dropdown-icon fe fe-send" /> Message</a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="javascript:void(0)"><i className="dropdown-icon fe fe-help-circle" /> Need help?</a>
                    <a className="dropdown-item" href="login.html"><i className="dropdown-icon fe fe-log-out" /> Sign out</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Start Page title and tab */}
      <div className="section-body">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center ">
            <div className="header-action">
              <h1 className="page-title">Students</h1>
              <ol className="breadcrumb page-breadcrumb">
                <li className="breadcrumb-item"><a href="#">Ericsson</a></li>
                <li className="breadcrumb-item active" aria-current="page">Students</li>
              </ol>
            </div>
            <ul className="nav nav-tabs page-header-tab">
              <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Student-all">List View</a></li>
              <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#generate-id-card">Generate Id Card</a></li>
              <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Student-profile">Profile</a></li>
              <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Student-add">Add</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="section-body mt-4">
        <div className="container-fluid">
          <div className="tab-content">
            <div className="tab-pane active" id="Student-all">
              <form className="card" onsubmit="return handleStudentSearchMain(event)">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-2 col-md-9 col-sm-6">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Name" />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-9 col-sm-6">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="StudentUID" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-9 col-sm-6">
                      <select className="form-control input-height class-select enabled-default" name="class">
                        <option selected value>Select Class...</option>
                      </select>
                    </div>
                    <div className="col-lg-2 col-md-9 col-sm-6">
                      <button type="submit" className="btn btn-sm btn-primary btn-block" title>Search</button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="table-responsive card">
                <div id="no-student-data" className="h2 d-flex mx-auto my-4 font-weight-bold text-secondary">
                  {/* <div className="spinner-border" role="status">
                       <span className="sr-only">Loading...</span>
                      </div>  */}
                </div>
                <table id="student-table" className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                  <thead>
                    <tr>
                      <th />
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Birth Date</th>
                      <th>Gender</th>
                      <th>Emergency Contact</th>
                      <th>Contact Number</th>
                    </tr>
                  </thead>
                  <tbody id="student-table-content">
                  </tbody>
                </table>
              </div>
            </div>
            <div className="tab-pane" id="generate-id-card">
              <form className="card" onsubmit="return handleStudentSearch(event)">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-2 col-md-9 col-sm-6">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Name" />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-9 col-sm-6">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="StudentUID" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-9 col-sm-6">
                      <select className="form-control input-height class-select enabled-default" name="class">
                        <option selected value>Select Class...</option>
                      </select>
                    </div>
                    <div className="col-lg-2 col-md-9 col-sm-6">
                      <button type="submit" className="btn btn-sm btn-primary btn-block" title>Search</button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="table-responsive card d-none">
                <div id="no-student-data-2" className="h2 d-flex mx-auto my-4 font-weight-bold text-secondary">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
                <table id="student-table-2" className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                  <thead>
                    <tr>
                      <th />
                      <th>Name</th>
                      <th>Class</th>
                      <th>Birth Date</th>
                      <th>Genter</th>
                      <th>Admission Date</th>
                      <th>Generate Id Card</th>
                    </tr>
                  </thead>
                  <tbody id="student-table-content-2">
                  </tbody>
                </table>
              </div>
              <div className="container d-none" id="id-card">
                <div className="d-flex justify-content-between">
                  <div className="h4">Identity Card</div>
                  <button className="ml-auto btn btn-primary" onclick="return printIdCard()">Print</button>
                </div>
                <div id="id-card-loading" style={{ height: '20em' }}>
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
                <div className="wrapper d-none" id="id-card-wrapper">
                  <div className="identityCard">
                    <header className="identityCard__header">
                      School Identity Card
                        </header>
                    <div className="identityCard__profile">
                      {/* <div class="identityCard__identity">
                                              <strong>Carte nationale d'identité n° :</strong> {id}
                                          </div> */}
                      <div className="identityCard__visual">
                        <img src="{photo}" alt="" />
                      </div>
                      <ul className="identityCard__list list-unstyled">
                        <li><strong>Name :</strong> {'{'}fullname{'}'}</li>
                        <li><strong>Class :</strong> {'{'}class section{'}'}</li>
                        <li><strong>Gender :</strong> {'{'}gender{'}'}</li>
                        <li><strong>Date of birth :</strong> {'{'}birthDate{'}'}</li>
                        <li><strong>Date of Admission :</strong> {'{'}dateOfAdmission{'}'}</li>
                        <li><strong>Blood Group :</strong> {'{'}bloodGroup{'}'}</li>
                      </ul>
                    </div>
                    <footer className="identityCard__footer">
                      <div className="filled"><span>Emergency Number: +91 9876543210</span></div>
                      {/* <div class="filled"><span>{School Address}</span></div> */}
                    </footer>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane" id="Student-profile">
              <div className="row">
                <div className="col-xl-4 col-md-12">
                  <div className="card">
                    <div className="card-body w_user">
                      <div className="user_avtar">
                        <img className="rounded-circle" src="../assets/images/sm/avatar2.jpg" alt="" />
                      </div>
                      <div className="wid-u-info">
                        <h5>Dessie Parks</h5>
                        <p className="text-muted m-b-0">119 Peepee Way, Hilo, HI, 96720</p>
                        <ul className="list-unstyled">
                          <li>
                            <h5 className="mb-0">270</h5>
                            <small>Followers</small>
                          </li>
                          <li>
                            <h5 className="mb-0">310</h5>
                            <small>Following</small>
                          </li>
                          <li>
                            <h5 className="mb-0">908</h5>
                            <small>Liks</small>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">About Me</h3>
                      <div className="card-options ">
                        <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                        <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x" /></a>
                      </div>
                    </div>
                    <div className="card-body">
                      <p>Hello I am Celena Anderson a Clerk in Xyz College USA. I love to work with all my college staff and seniour professors.</p>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <b>Gender </b>
                          <div className="pull-right">Female</div>
                        </li>
                        <li className="list-group-item">
                          <b>Department</b>
                          <div className="pull-right">Mechanical</div>
                        </li>
                        <li className="list-group-item">
                          <b>Email </b>
                          <div className="pull-right">test@example.com</div>
                        </li>
                        <li className="list-group-item">
                          <b>Phone</b>
                          <div className="pull-right">1234567890</div>
                        </li>
                        <li className="list-group-item">
                          <div className="clearfix">
                            <div className="float-left"><strong>Study</strong></div>
                            <div className="float-right"><small className="text-muted">35%</small></div>
                          </div>
                          <div className="progress progress-xxs">
                            <div className="progress-bar bg-pink" role="progressbar" style={{ width: '35%' }} aria-valuenow={35} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="clearfix">
                            <div className="float-left"><strong>Cricket</strong></div>
                            <div className="float-right"><small className="text-muted">72%</small></div>
                          </div>
                          <div className="progress progress-xxs">
                            <div className="progress-bar bg-blue" role="progressbar" style={{ width: '72%' }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="clearfix">
                            <div className="float-left"><strong>Music</strong></div>
                            <div className="float-right"><small className="text-muted">60%</small></div>
                          </div>
                          <div className="progress progress-xxs">
                            <div className="progress-bar bg-green" role="progressbar" style={{ width: '60%' }} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="card-footer text-center">
                      <div className="row">
                        <div className="col-md-9 col-sm-4 col-6">
                          <div className="font-18 font-weight-bold">37</div>
                          <div>Projects</div>
                        </div>
                        <div className="col-md-9 col-sm-4 col-6">
                          <div className="font-18 font-weight-bold">51</div>
                          <div>Tasks</div>
                        </div>
                        <div className="col-md-9 col-sm-4 col-6">
                          <div className="font-18 font-weight-bold">61</div>
                          <div>Uploads</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Timeline Activity</h3>
                      <div className="card-options">
                        <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                        <a href="#" className="card-options-fullscreen" data-toggle="card-fullscreen"><i className="fe fe-maximize" /></a>
                        <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x" /></a>
                        <div className="item-action dropdown ml-2">
                          <a href="javascript:void(0)" data-toggle="dropdown"><i className="fe fe-more-vertical" /></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-eye" /> View Details </a>
                            <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-share-alt" /> Share </a>
                            <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-cloud-download" /> Download</a>
                            <div className="dropdown-divider" />
                            <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-copy" /> Copy to</a>
                            <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-folder" /> Move to</a>
                            <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-edit" /> Rename</a>
                            <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-trash" /> Delete</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="summernote">
                        Hello there,
                            <br />
                        <p>The toolbar can be customized and it also supports various callbacks such as <code>oninit</code>, <code>onfocus</code>, <code>onpaste</code> and many more.</p>
                        <p>Please try <b>paste some texts</b> here</p>
                      </div>
                      <div className="timeline_item ">
                        <img className="tl_avatar" src="../assets/images/xs/avatar1.jpg" alt="" />
                        <span><a href="javascript:void(0);">Elisse Joson</a> San Francisco, CA <small className="float-right text-right">20-April-2019 - Today</small></span>
                        <h6 className="font600">Hello, 'Im a single div responsive timeline without media Queries!</h6>
                        <div className="msg">
                          <p>I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web card she has is the Lorem card.</p>
                          <a href="javascript:void(0);" className="mr-20 text-muted"><i className="fa fa-heart text-pink" /> 12 Love</a>
                          <a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><i className="fa fa-comments" /> 1 Comment</a>
                          <div className="collapse p-4 section-gray mt-2" id="collapseExample">
                            <form className="well">
                              <div className="form-group">
                                <textarea rows={2} className="form-control no-resize" placeholder="Enter here for tweet..." defaultValue={""} />
                              </div>
                              <button className="btn btn-primary">Submit</button>
                            </form>
                            <ul className="recent_comments list-unstyled mt-4 mb-0">
                              <li>
                                <div className="avatar_img">
                                  <img className="rounded img-fluid" src="../assets/images/xs/avatar4.jpg" alt="" />
                                </div>
                                <div className="comment_body">
                                  <h6>Donald Gardner <small className="float-right font-14">Just now</small></h6>
                                  <p>Lorem ipsum Veniam aliquip culpa laboris minim tempor</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="timeline_item ">
                        <img className="tl_avatar" src="../assets/images/xs/avatar4.jpg" alt="" />
                        <span><a href="javascript:void(0);" title>Dessie Parks</a> Oakland, CA <small className="float-right text-right">19-April-2019 - Yesterday</small></span>
                        <h6 className="font600">Oeehhh, that's awesome.. Me too!</h6>
                        <div className="msg">
                          <p>I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. on the web by far... While that's mock-ups and this is politics, are they really so different? I think the only card she has is the Lorem card.</p>
                          <div className="timeline_img mb-20">
                            <img className="width100" src="../assets/images/gallery/1.jpg" alt="Awesome Image" />
                            <img className="width100" src="../assets/images/gallery/2.jpg" alt="Awesome Image" />
                          </div>
                          <a href="javascript:void(0);" className="mr-20 text-muted"><i className="fa fa-heart text-pink" /> 23 Love</a>
                          <a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1"><i className="fa fa-comments" /> 2 Comment</a>
                          <div className="collapse p-4 section-gray mt-2" id="collapseExample1">
                            <form className="well">
                              <div className="form-group">
                                <textarea rows={2} className="form-control no-resize" placeholder="Enter here for tweet..." defaultValue={""} />
                              </div>
                              <button className="btn btn-primary">Submit</button>
                            </form>
                            <ul className="recent_comments list-unstyled mt-4 mb-0">
                              <li>
                                <div className="avatar_img">
                                  <img className="rounded img-fluid" src="../assets/images/xs/avatar4.jpg" alt="" />
                                </div>
                                <div className="comment_body">
                                  <h6>Donald Gardner <small className="float-right font-14">Just now</small></h6>
                                  <p>Lorem ipsum Veniam aliquip culpa laboris minim tempor</p>
                                  <div className="timeline_img mb-20">
                                    <img className="width150" src="../assets/images/gallery/7.jpg" alt="Awesome Image" />
                                    <img className="width150" src="../assets/images/gallery/8.jpg" alt="Awesome Image" />
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="avatar_img">
                                  <img className="rounded img-fluid" src="../assets/images/xs/avatar3.jpg" alt="" />
                                </div>
                                <div className="comment_body">
                                  <h6>Dessie Parks <small className="float-right font-14">1min ago</small></h6>
                                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="timeline_item ">
                        <img className="tl_avatar" src="../assets/images/xs/avatar7.jpg" alt="" />
                        <span><a href="javascript:void(0);" title>Rochelle Barton</a> San Francisco, CA <small className="float-right text-right">12-April-2019</small></span>
                        <h6 className="font600">An Engineer Explains Why You Should Always Order the Larger Pizza</h6>
                        <div className="msg">
                          <p>I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web by far... While that's mock-ups and this is politics, is the Lorem card.</p>
                          <a href="javascript:void(0);" className="mr-20 text-muted"><i className="fa fa-heart text-pink" /> 7 Love</a>
                          <a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2"><i className="fa fa-comments" /> 1 Comment</a>
                          <div className="collapse p-4 section-gray mt-2" id="collapseExample2">
                            <form className="well">
                              <div className="form-group">
                                <textarea rows={2} className="form-control no-resize" placeholder="Enter here for tweet..." defaultValue={""} />
                              </div>
                              <button className="btn btn-primary">Submit</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane" id="Student-add">
              <div className="row clearfix">
                <div className="col col-md-12 col-sm-12">
                  <div className="card d-none" id="fee-card-admission">
                    <div className="card-header">
                      <h3 className="card-title">Fee Info</h3>
                      <div className="card-options ">
                        <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                        {/* <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a> */}
                      </div>
                    </div>
                    <div className="d-flex card-body">
                      <div className="table-responsive card">
                        <div className="form-group row">
                          <div className="col-6">
                            <div className="form-check m-4">
                              <input className="form-check-input" type="checkbox" onchange="return feeToggle(event)" defaultValue data-entity="hostel" id="avail-hostel-fee" />
                              <label className="form-check-label" htmlFor="avail-hostel-fee">
                                Avail Hostel Fee
                                  </label>
                            </div>
                            <div className="form-check m-4 mb-2">
                              <input className="form-check-input" type="checkbox" onchange="return feeToggle(event)" defaultValue data-entity="transport" id="avail-transport-fee" />
                              <label className="form-check-label" htmlFor="avail-transport-fee">
                                Avail Transport Fee
                                  </label>
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <form className="form-group m-3" id="fee-submitter" onsubmit="return handleSubmitFee(event)">
                              <label htmlFor="fee-to-pay" className="pl-2">Capture fee:</label>
                              <div className="d-flex">
                                <input type="number" className="form-control" oninput="return checkFeeValidity(event)" min={1} required id="fee-to-pay" placeholder="Enter amount to pay" />
                                <button type="submit" className="btn btn-primary">Submit</button>
                              </div>
                            </form>
                          </div>
                        </div>
                        <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap border-top">
                          <thead>
                            <tr>
                              <th>Particular</th>
                              <th>Current Year Total Amount</th>
                              <th>Paid Amount</th>
                              <th>Balance(To Be Paid)</th>
                            </tr>
                          </thead>
                          <tbody id="fee-after-admission">
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <button type="button" onclick="return toggleFeeCard()" className="btn btn-primary btn-lg btn-block">Continue</button>
                  </div>
                  <div className="card" id="admission-card">
                    <div className="card-header">
                      <h3 className="card-title">Basic Information</h3>
                      <div className="card-options ">
                        <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                        {/* <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a> */}
                      </div>
                    </div>
                    <div className="container">
                      <div className="alert alert-danger d-none" id="student-form-alert">
                        <ul className="mb-0">
                        </ul>
                      </div>
                    </div>
                    <form onsubmit="return handleAdmissionFormSubmit(event)" noValidate="novalidate" id="admission-form">
                      <div className="d-flex card-body">
                        <div className="col-12 col-md-6">
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">First Name <span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <input type="text" name="first-name" className="form-control" placeholder="Enter First name" required />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Last Name <span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <input type="text" name="last-name" className="form-control" placeholder="Enter Last name" required />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Admission Sought for Class <span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <select className="form-control input-height class-select" disabled name="class" required onchange="return populateClassSection(event)">
                                <option disabled selected value>Select Class...</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Class Section</label>
                            <div className="col-md-9">
                              <select name="class-section" id="class-section-select" className="form-control">
                                <option disabled selected value>Select</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Academic Year</label>
                            <div className="col-md-4">
                              <AcademicYear name="start_year"></AcademicYear>
                            </div>
                            <div className="col-md-4">
                              <AcademicYear name="end_year"></AcademicYear>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Date of Birth&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <input data-provide="datepicker" name="dob" data-date-autoclose="true" className="form-control" placeholder="DD/MM/YYYY" required />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Place of Birth</label>
                            <div className="col-md-9">
                              <input type="text" className="form-control" name="birth-place" placeholder="Enter Place of Birth" />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Nationality&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <input type="text" className="form-control" name="nationality" placeholder="Enter Nationality" required />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Gender&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <select className="form-control input-height" name="gender" required>
                                <option value>Select...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Permanent Address&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <textarea rows={3} className="form-control" name="permanent-address" required placeholder="Street, City" defaultValue={""} />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">State&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              {/* <input type="text" className="form-control" name="permanent-state" required placeholder="Enter State" /> */}
                              <StateDropdown name="permanent-state"></StateDropdown>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Pincode&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <input type="text" className="form-control" name="permanent-pincode" required placeholder="Enter Pincode" />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Caste&nbsp;<span className="text-danger">*</span></label>
                            <div className="custom-control custom-radio custom-control-inline">
                              <input type="radio" className="custom-control-input" defaultValue="General" id="generalCaste" name="caste" defaultChecked />
                              <label className="custom-control-label" htmlFor="generalCaste">General</label>
                            </div>
                            {/* Default inline 2*/}
                            <div className="custom-control custom-radio custom-control-inline">
                              <input type="radio" className="custom-control-input" defaultValue="OBC" id="obcCaste" name="caste" />
                              <label className="custom-control-label" htmlFor="obcCaste">OBC</label>
                            </div>
                            {/* Default inline 3*/}
                            <div className="custom-control custom-radio custom-control-inline">
                              <input type="radio" className="custom-control-input" defaultValue="SC/ST" id="scstCaste" name="caste" />
                              <label className="custom-control-label" htmlFor="scstCaste">SC/ST</label>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Mother Tounge&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <input type="text" className="form-control" name="mother-tongue" placeholder="Enter Mother Tongue" required />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Student Photo</label>
                            <div className="col-md-5 height-100">
                              <input type="file" className name="student-photo" />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Aadhar Number&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <input type="text" className="form-control" name="aadhar-number" required placeholder="Enter Aadhar Number" />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Religion&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <select className="form-control input-height" name="religion" required>
                                <option>Select Religion</option>
                                <option value="Hindu">Hindu</option>
                                <option value="mMslim">Muslim</option>
                                <option value="Christian">Christian</option>
                                <option value="Sikh">Sikh</option>
                                <option value="Buddhist/Jain">Buddhist / Jain</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 col-form-label">Blood Group&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <select className="form-control input-height" name="blood_group" required>
                                <option value="A+" selected>A+</option><option value="A-">A-</option>
                                <option value="B+">B+</option><option value="B-">B-</option>
                                <option value="O+">O+</option><option value="O-">O-</option>
                                <option value="AB+">AB+</option><option value="AB-">AB-</option>
                              </select>
                            </div>
                          </div>
                          <br />
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" onchange="return togglePresentAddress(event)" id="same-address" />
                            <label className="form-check-label" htmlFor="same-address">Present Address Same as Permanent Address</label>
                          </div>
                          <div className="form-group row present-address">
                            <label className="col-md-3 col-form-label">Present Address&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <textarea rows={3} className="form-control" name="present-address" required placeholder="Street, City" defaultValue={""} />
                            </div>
                          </div>
                          <div className="form-group row present-address">
                            <label className="col-md-3 col-form-label">State&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <StateDropdown name="present-state"></StateDropdown>
                            </div>
                          </div>
                          <div className="form-group row present-address">
                            <label className="col-md-3 col-form-label">Pincode&nbsp;<span className="text-danger">*</span></label>
                            <div className="col-md-9">
                              <input type="text" className="form-control" name="present-pincode" required placeholder="Enter Pincode" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">Parent's/Guardian's Information</h3>
                        <div className="row">
                          <div className="col-12 col-md-12">
                            <div className="row">
                              <div className="form-group row col-6">
                                <label className="col-md-4 col-form-label">Enter Information for: </label>
                                <div className="col-md-8">
                                  <select className="form-control custom-select" onchange="return toggleParentsInfo(event)" required>
                                    <option selected value="Parents">Parents</option>
                                    <option value="Guardian">Guardian</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row parent-info">
                              <div className="form-group row col-6">
                                <label className="col-md-3 col-form-label">Father's Photo</label>
                                <div className="col-md-5 height-100">
                                  <input type="file" name="father-photo" className required />
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Father's Name&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" name="father-name" className="form-control" required placeholder="Enter Name" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Qualification&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" name="father-quanlification" className="form-control" required placeholder="Enter Qualification" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Occupation&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" name="father-occupation" className="form-control" required placeholder="Enter Occupation" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Mobile No.&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" name="father-mobile" className="form-control" required placeholder="Enter Mobile No." />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Email</label>
                                  <div className="col-md-9">
                                    <input type="text" name="father-email" className="form-control" required placeholder="Enter Email" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 row parent-info">
                              <div className="form-group row col-6">
                                <label className="col-md-3 col-form-label">Mother's Photo</label>
                                <div className="col-md-5 height-100">
                                  <input type="file" name="mother-photo" className required />
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Mother's Name&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" name="mother-name" className="form-control" required placeholder="Enter Name" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Qualification&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" name="mother-qualification" className="form-control" required placeholder="Enter Qualification" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Occupation&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" name="mother-occupation" className="form-control" required placeholder="Enter Occupation" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Mobile No.&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" name="mother-mobile" className="form-control" required placeholder="Enter Mobile No." />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Email</label>
                                  <div className="col-md-9">
                                    <input type="text" name="mother-email" className="form-control" required placeholder="Enter Email" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 row guardian-info d-none">
                              <div className="form-group row col-6">
                                <label className="col-md-3 col-form-label">Guardian's Photo</label>
                                <div className="col-md-5 height-100">
                                  <input type="file" name="guardian-photo" className required />
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Guardian's Name&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" name="guardian-name" className="form-control" placeholder="Enter Name" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Qualification&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" name="guardian-qualification" className="form-control" placeholder="Enter Qualification" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Occupation&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" name="guardian-occupation" className="form-control" placeholder="Enter Occupation" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Mobile No.&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" name="guardian-mobile" className="form-control" placeholder="Enter Mobile No." />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-3 col-form-label">Email</label>
                                  <div className="col-md-9">
                                    <input type="text" name="guardian-email" className="form-control" placeholder="Enter Email" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Submit Your Admission Form</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Start main footer */}
      <div className="section-body">
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                Copyright © 2019 <a href="https://themeforest.net/user/puffintheme/portfolio">PuffinTheme</a>.
                  </div>
              <div className="col-md-6 col-sm-12 text-md-right">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item"><a href="../doc/index.html">Documentation</a></li>
                  <li className="list-inline-item"><a href="javascript:void(0)">FAQ</a></li>
                  <li className="list-inline-item"><a href="javascript:void(0)" className="btn btn-outline-primary btn-sm">Buy Now</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Students;