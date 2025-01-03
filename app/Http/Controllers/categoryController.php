<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\category;
use Illuminate\Http\Request;

class categoryController extends Controller
{
    public function viewCategoryPage(){
        $categories = category::orderBy('id','asc')->paginate(5);
        return view('admin.category.category')->with(['categories'=>$categories]);
    }

    public function addCategory(Request $request){
        category::insert([
            "category_name" => $request->category_name,
            "created_at" => Carbon::now(),
        ]);

        // $categories = category::all();
        return back();
    }
}
