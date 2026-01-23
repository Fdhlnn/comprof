<?php

namespace App\Http\Controllers\Products;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index() {
        return inertia::render('Products/Index');
    }
}
