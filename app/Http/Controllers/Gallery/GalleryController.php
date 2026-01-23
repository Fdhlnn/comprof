<?php

namespace App\Http\Controllers\Gallery;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        return inertia::render('Gallery/Index');
    }
}
