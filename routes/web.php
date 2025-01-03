<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\productController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\categoryController;
use App\Http\Controllers\subcategoryController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin', function () {
    return view('admin.welcome');
});
Route::get('/customer', function () {
    return view('customer.welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('category')->name('category.')->group(function (){
    Route::get('/categories', [categoryController::class, 'viewCategoryPage'])->name('view.form');
    Route::post('/add/category',[categoryController::class, 'addCategory'])->name('add');
    Route::get('/subcategories',[subcategoryController::class, 'viewSubCategory'])->name('view.subcategory');
    Route::post('/subcategory/add',[subcategoryController::class, 'addSubCategory'])->name('subcategory.add');
});


Route::get('/add/product/',[productController::class, 'addProdPage'])->name('product.form');
Route::post('add/product/',[productController::class, 'addNewProduct']);
Route::get('/view/product/page/',[productController::class, 'viewProductList'])->name('product.list');
Route::get('/delete/product/{id}',[productController::class, 'deleteProduct']);
Route::get('/edit/product/{id}', [productController::class, 'editProduct']);
Route::post('update/product/',[productController::class, 'updateProduct']);



require __DIR__.'/auth.php';
require __DIR__.'/admin-auth.php';
require __DIR__.'/customer-auth.php';
