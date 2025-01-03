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
                    <form action="{{route('category.subcategory.add')}}" method="POST">
                        @csrf
                        <div class="form-group">
                            <div>
                                <label for="category_id">Category</label>
                                <select class="form-select" name="category_id" id="category_id" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    @foreach ($categories as $category)
                                        <option value="{{$category->id}}">{{$category->category_name}}</option>
                                    @endforeach
                                  </select>
                            </div>
                            <div class="pt-4">
                                <label for="subcategory_name">Sub-Category</label>
                                <input class="form-control" name="subcategory_name" id="subcategory_name" type="text">
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
                    <h5 class="text-white font-weight-bold mt-3 mb-3">Sub-category List</h5>
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
                                @foreach ($subCategories as $index=>$subcategory)
                                    <tr>
                                        <th scope="row">{{ $index+$subCategories->firstItem() }}</th>
                                        <td>{{ $subcategory->category_name }}</td>
                                        <td>{{ $subcategory->subcategory_name}}</td>
                                        <td><a href="{{url('/edit/category')}}/{{$subcategory->id}}" class="btn btn-warning btn-sm rounded"><i class="fa fa-edit fa-alt"></i></a></td>
                                        <td><a href="{{url('/delete/category')}}/{{$subcategory->id}}" class="btn btn-danger btn-sm rounded"><i class="fa fa-trash fa-alt"></i></a></td>
                                    </tr>

                                @endforeach


                            </tbody>
                        </table>
                        {{-- {{ $categories->links() }} --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
