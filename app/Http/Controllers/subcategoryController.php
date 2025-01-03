<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\category;
use App\Models\subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class subcategoryController extends Controller
{
    public function viewSubCategory(){
        $categories = category::all();
        $subCategories = subcategory::orderBy('id','asc')->paginate(5);
        $subCategories= DB::table('subcategories')
            ->join('categories','subcategories.category_id','=','categories.id')
            ->select('subcategories.*','categories.category_name')
            ->orderBy('id', 'asc')
            ->paginate(5);
        return view('admin.category.subcategory', compact('categories', 'subCategories'));
    }

    public function addSubcategory(Request $request){
        subcategory::insert([
            "category_id" => $request->category_id,
            "subcategory_name" => $request->subcategory_name,
            "created_at" => Carbon::now(),
        ]);

        return back();
    }




}
