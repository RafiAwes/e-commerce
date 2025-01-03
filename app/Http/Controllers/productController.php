<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\product;
use App\Models\category;
use Faker\Provider\Image;
use App\Models\subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

class productController extends Controller
{
    public function addProdPage(){
        $categories = category::all();
        $subcategories = subcategory::all();
        return view('product.addProduct', compact('categories','subcategories'));
    }

    public function addNewProduct(Request $request){

        // $photos = array();
        // $photos = $request->file('photos');
        // foreach($photos as $photo ){
        //     $destinationPath = public_path().'/product_image/';
        //     $extraImageName = time().'.'.$photo->getClientOriginalExtension();
        //     $photo->move($destinationPath,$extraImageName);
        // }


        if($request->hasFile('image')){
            //image processing
            $get_image = $request->file('image');
            $image_name = time().'.'. $get_image->getClientOriginalExtension();
            $get_image->move(public_path('product_image'), $image_name);
            // Image::make($get_image)->save('product_image/'.$image_name,100);

            //slug
            $without_space = str_replace(' ','-',$request->name);
            $without_slashAndSpace = str_replace('/','-',$without_space);
            $slug = str_replace('.','-',$without_slashAndSpace);

            //inserting product data

            product::insert([
                'category_id' => $request->category_id,
                'subcategory_id' => $request->subcategory_id,
                'name' => $request->name,
                'image' => 'product_image/'.$image_name,
                'description' => $request->description,
                'price' => $request->price,
                'stock' => $request->stock,
                'slug' => $slug,
                'created_at' => Carbon::now(),
            ]);
            // Toastr::success('Successfully added', 'Success', ["positionClass" => "toast-top-right"]);
            return back();
        }

    }
    public function viewProductList(){

        $products = DB::table('products')
        ->join('categories','products.category_id','=','categories.id')
        ->select('products.*','categories.category_name')
        ->orderBy('id','desc')
        ->paginate(15);
        return view('product.productlist', compact('products'));
    }

    public function deleteProduct($id){

        $img = product::findOrFail($id);
        unlink($img->image);
        product::where('id',$id)
        ->delete();
        return back();

    }

    public function editProduct($id){

        $categories = category::all();
        $subcategories = subcategory::all();
        $product = product::where('id', $id)->first();

        return view('product.editProductPage', compact('product','categories','subcategories'));
    }

    public function updateProduct(Request $request){
        if($request->hasFile('image')){

            //removing current image
            $product_info = product::where('id', $request->product_id)->first();
            if($product_info->image != null){
                unlink($product_info->image);
            }
            //image processing
            $get_image = $request->file('image');
            $image_name = time().'.'. $get_image->getClientOriginalExtension();
            $get_image->move(public_path('product_image'), $image_name);
            // Image::make($get_image)->save('product_image/'.$image_name,100);

            //slug
            $without_space = str_replace(' ','-',$request->name);
            $without_slashAndSpace = str_replace('/','-',$without_space);
            $slug = str_replace('.','-',$without_slashAndSpace);

            //update product
            product::where('id', $request->product_id)->update([
                'category_id' => $request->category_id,
                'subcategory_id' => $request->subcategory_id,
                'name' => $request->name,
                'image' => 'product_image/'.$image_name,
                'description' => $request->description,
                'price' => $request->price,
                'stock' => $request->stock,
                'slug' => $slug,
                'updated_at' => carbon::now(),
            ]);
        }
        else{
            //slug
            $without_space = str_replace(' ','-',$request->name);
            $without_slashAndSpace = str_replace('/','-',$without_space);
            $slug = str_replace('.','-',$without_slashAndSpace);

            //update product
            product::where('id', $request->product_id)->update([
                'category_id' => $request->category_id,
                'subcategory_id' => $request->subcategory_id,
                'name' => $request->name,
                // 'image' => 'product_image/'.$image_name,
                'description' => $request->description,
                'price' => $request->price,
                'stock' => $request->stock,
                'slug' => $slug,
                'updated_at' => carbon::now(),
            ]);
        }
        return redirect('/view/product/page/');
    }
}
