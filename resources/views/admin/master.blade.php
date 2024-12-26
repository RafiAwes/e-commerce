<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- basic -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- mobile metas -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="viewport" content="initial-scale=1, maximum-scale=1">
        <!-- site metas -->
        <title>Admin</title>
        <meta name="keywords" content="">
        <meta name="description" content="">
        <meta name="author" content="">
        <!-- site icon -->
        <link rel="icon" href="{{ url('/') }}/backend_assets/images/fevicon.png" type="image/png" />
        <!-- bootstrap css -->
        <link rel="stylesheet" href="{{ url('/') }}/backend_assets/css/bootstrap.min.css" />
        <!-- site css -->
        <link rel="stylesheet" href="{{ url('/') }}/backend_assets/style.css" />
        <!-- responsive css -->
        <link rel="stylesheet" href="{{ url('/') }}/backend_assets/css/responsive.css" />
        <!-- color css -->
        <link rel="stylesheet" href="{{ url('/') }}/backend_assets/css/colors.css" />
        <!-- select bootstrap -->
        <link rel="stylesheet" href="{{ url('/') }}/backend_assets/css/bootstrap-select.css" />
        <!-- scrollbar css -->
        <link rel="stylesheet" href="{{ url('/') }}/backend_assets/css/perfect-scrollbar.css" />
        <!-- custom css -->
        <link rel="stylesheet" href="{{ url('/') }}/backend_assets/css/custom.css" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

        {{-- font awesome --}}
        {{-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" /> --}}
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body class="dashboard dashboard_1">
        <div class="full_container">
            <div class="inner_container">
              <!-- Sidebar  -->
                <nav id="sidebar">
                    <div class="sidebar_blog_1">
                        <div class="sidebar-header">
                        <div class="logo_section">
                            <a href="index.html"><img class="logo_icon img-responsive" src="{{url('/')}}/backend_assets/images/logo/logo_icon.png" alt="#" /></a>
                        </div>
                    </div>
                    <div class="sidebar_user_info">
                        <div class="icon_setting"></div>
                            <div class="user_profle_side">
                                <div class="user_img"><img class="img-responsive" src="{{url('/')}}/backend_assets/images/layout_img/user_img.jpg" alt="#" /></div>
                                <div class="user_info">
                                    <h6>John David</h6>
                                    <p><span class="online_animation"></span> Online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sidebar_blog_2">
                        <h4>General</h4>
                        <ul class="list-unstyled components">
                        <li class="active">
                            <a href="{{route('admin.dashboard')}}"> <i class="fa fa-dashboard yellow_color"></i> <span>Dashboard</span></a>
                        </li>
                        <li>
                            <a href="#element" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i class="fa fa-solid fa-code-fork white_color"></i> <span>Categories</span></a>
                            <ul class="collapse list-unstyled" id="element">
                                <li><a href="general_elements.html"><i class="fa fa-plus white_color"></i> <span>Add Category</span></a></li>
                                <li><a href="media_gallery.html"><i class="fa fa-solid fa-icons white_color"></i> <span>Category List</span></a></li>
                            </ul>
                        </li>
                        <li><a href="widgets.html"><i class="fa fa-clock-o orange_color"></i> <span>Widgets</span></a></li>
                        <li>
                            <a href="#element" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i class="fa fa-diamond purple_color"></i> <span>Elements</span></a>
                            <ul class="collapse list-unstyled" id="element">
                                <li><a href="general_elements.html">> <span>General Elements</span></a></li>
                                <li><a href="media_gallery.html">> <span>Media Gallery</span></a></li>
                                <li><a href="icons.html">> <span>Icons</span></a></li>
                                <li><a href="invoice.html">> <span>Invoice</span></a></li>
                            </ul>
                        </li>
                        <li><a href="tables.html"><i class="fa fa-table purple_color2"></i> <span>Tables</span></a></li>
                        <li>
                            <a href="#apps" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i class="fa fa-object-group blue2_color"></i> <span>Apps</span></a>
                            <ul class="collapse list-unstyled" id="apps">
                                <li><a href="email.html">> <span>Email</span></a></li>
                                <li><a href="calendar.html">> <span>Calendar</span></a></li>
                                <li><a href="media_gallery.html">> <span>Media Gallery</span></a></li>
                            </ul>
                        </li>
                        <li><a href="price.html"><i class="fa fa-briefcase blue1_color"></i> <span>Pricing Tables</span></a></li>
                        <li>
                            <a href="contact.html">
                            <i class="fa fa-paper-plane red_color"></i> <span>Contact</span></a>
                        </li>
                        <li class="active">
                            <a href="#additional_page" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i class="fa fa-clone yellow_color"></i> <span>Additional Pages</span></a>
                            <ul class="collapse list-unstyled" id="additional_page">
                                <li>
                                    <a href="profile.html">> <span>Profile</span></a>
                                </li>
                                <li>
                                    <a href="project.html">> <span>Projects</span></a>
                                </li>
                                <li>
                                    <a href="login.html">> <span>Login</span></a>
                                </li>
                                <li>
                                    <a href="404_error.html">> <span>404 Error</span></a>
                                </li>
                            </ul>
                        </li>
                        <li><a href="map.html"><i class="fa fa-map purple_color2"></i> <span>Map</span></a></li>
                        <li><a href="charts.html"><i class="fa fa-bar-chart-o green_color"></i> <span>Charts</span></a></li>
                        <li><a href="settings.html"><i class="fa fa-cog yellow_color"></i> <span>Settings</span></a></li>
                        </ul>
                        </div>
                    </nav>
                <!-- end sidebar -->
                <!-- right content -->
                <div id="content">
                    <!-- topbar -->
                    <div class="topbar">
                        <nav class="navbar navbar-expand-lg navbar-light">
                            <div class="full">
                                <button type="button" id="sidebarCollapse" class="sidebar_toggle"><i class="fa fa-bars"></i></button>
                                <div class="logo_section">
                                    <a href="index.html"><img class="img-responsive" src="{{url('/')}}/backend_assets/images/logo/logo.png" alt="#" /></a>
                                </div>
                                <div class="right_topbar">
                                    <div class="icon_info">
                                        <ul>
                                            <li><a href="#"><i class="fa fa-bell-o"></i><span class="badge">2</span></a></li>
                                            <li><a href="#"><i class="fa fa-question-circle"></i></a></li>
                                            <li><a href="#"><i class="fa fa-envelope-o"></i><span class="badge">3</span></a></li>
                                        </ul>
                                        <ul class="user_profile_dd">
                                            <li>
                                                <a class="dropdown-toggle" data-toggle="dropdown"><img class="img-responsive rounded-circle" src="{{url('/')}}/backend_assets/images/layout_img/user_img.jpg" alt="#" /><span class="name_user">{{auth()->user()->admin_name}}</span></a>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" href="profile.html">My Profile</a>
                                                    <a class="dropdown-item" href="settings.html">Settings</a>
                                                    <a class="dropdown-item" href="help.html">Help</a>
                                                    <a class="dropdown-item" href="#"><span>Log Out</span> <i class="fa fa-sign-out"></i></a>
                                                    <form method="POST" action="{{ route('admin.logout') }}">
                                                        @csrf
                                                        <a class="dropdown-item" href="{{ route('admin.logout') }}" onclick="event.preventDefault(); this.closest('form').submit()"><span>Log Out</span> <i class="fa fa-sign-out"></i></a>
                                                    </form>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                 <!-- end topbar -->
                    <!--content-->
                    @yield('admin-content')
                    <!-- end content -->
                </div>
            </div>
        </div>
        <script src="//cdn.ckeditor.com/4.14.0/standard/ckeditor.js"></script>
        <script type="text/javascript">

            $(document).ready(function() {

            $('.ckeditor').ckeditor();

            });

        </script>
        <!-- jQuery -->
        <script src="{{ url('/') }}/backend_assets/js/jquery.min.js"></script>
        <script src="{{ url('/') }}/backend_assets/js/popper.min.js"></script>
        <script src="{{ url('/') }}/backend_assets/js/bootstrap.min.js"></script>
        <!-- wow animation -->
        <script src="{{ url('/') }}/backend_assets/js/animate.js"></script>
        <!-- select country -->
        <script src="{{ url('/') }}/backend_assets/js/bootstrap-select.js"></script>
        <!-- owl carousel -->
        <script src="{{ url('/') }}/backend_assets/js/owl.carousel.js"></script>
        <!-- chart js -->
        <script src="{{ url('/') }}/backend_assets/js/Chart.min.js"></script>
        <script src="{{ url('/') }}/backend_assets/js/Chart.bundle.min.js"></script>
        <script src="{{ url('/') }}/backend_assets/js/utils.js"></script>
        <script src="{{ url('/') }}/backend_assets/js/analyser.js"></script>
        <!-- nice scrollbar -->
        <script src="{{ url('/') }}/backend_assets/js/perfect-scrollbar.min.js"></script>
        <script>
            var ps = new PerfectScrollbar('#sidebar');
        </script>
        <!-- custom js -->
        <script src="{{ url('/') }}/backend_assets/js/chart_custom_style1.js"></script>
        <script src="{{ url('/') }}/backend_assets/js/custom.js"></script>
    </body>
</html>
