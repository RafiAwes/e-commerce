@extends('admin.master')
@section('admin-content')
<div class="container md:container pt-5">
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-head rounded text-center font-bold" style="background-color: rgb(79, 82, 80)">
                    <h5 class="text-white font-weight-bold mt-3 mb-3">Add Category </h5>
                </div>
                <div class="card-body">
                    <form action="{{route('category.add')}}" method="POST">
                        @csrf
                        <div class="form-group">
                            <div>
                                <label for="category_name">Category</label>
                                <input class="form-control" name="category_name" id="category_name" type="text">
                            </div>
                            <div class="text-center">
                                <input type="submit" class="btn btn-success mt-3" value="insert">
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <div>

            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
                <div class="card-head rounded text-center font-bold" style="background-color: rgb(79, 82, 80)">
                    <h5 class="text-white font-weight-bold mt-3 mb-3">Category List</h5>
                </div>
                <div class="card-body">
                    <div class="mt-3">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">SL</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($categories as $index=>$category)
                                    <tr>
                                        <th scope="row">{{ $index+$categories->firstItem() }}</th>
                                        <td>{{ $category->category_name }}</td>
                                        <td>{{ $category->created_at}}</td>
                                        <td><a href="{{url('/edit/category')}}/{{$category->id}}" class="btn btn-warning btn-sm rounded"><i class="fa fa-edit fa-alt"></i></a></td>
                                        <td><a href="{{url('/delete/category')}}/{{$category->id}}" class="btn btn-danger btn-sm rounded"><i class="fa fa-trash fa-alt"></i></a></td>
                                    </tr>

                                @endforeach


                            </tbody>
                        </table>
                        {{ $categories->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
