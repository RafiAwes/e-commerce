@extends('admin.master')
@section('admin-content')
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-12">
            <div class=" card mt-3">
                <div class="card-head bg-success text-center text-bold rounded">
                    <h1 class="text-white m-3"> View All Products</h1>
                </div>
                <div class="card-body">
                    <table class="table table-striped table-fluid">
                        <thead>
                          <tr>
                            <th scope="col">Sl</th>
                            <th scope="col">Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>

                          </tr>
                        </thead>
                        <tbody>
                            @foreach ($products as $index=>$product)
                                <tr>
                                    <th scope="row">{{ $index+$products->firstItem() }}</th>
                                    @php
                                        $newdate = Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $product->created_at)->format('d M, Y');
                                    @endphp
                                    <td>{{ $newdate }}</td>
                                    <td>{{ $product->category_name }}</td>
                                    <td>{{ $product->name }}</td>
                                    <td>
                                        @if ($product->image != null)
                                            <img src="{{ url($product->image) }}" height="60" width="60">
                                        @endif
                                    </td>
                                    <td>{{ $product->price }}</td>
                                    <td>{{ $product->stock }}</td>
                                    <td><a href="{{ url('/edit/product') }}/{{ $product->id }}" class="btn btn-warning btn-sm rounded">Edit</a></td>
                                    <td><a href="{{ url('/delete/product') }}/{{ $product->id }}" class="btn btn-danger btn-sm rounded">Delete</a></td>

                                </tr>
                            @endforeach

                        </tbody>
                      </table>
                </div>

            </div>
        </div>
    </div>
</div>
@endsection
