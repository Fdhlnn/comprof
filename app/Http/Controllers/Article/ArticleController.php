<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        return inertia::render('Articles/Index');
    }

    public function create()
    {
        return inertia::render('Articles/Create', [
            'title' => 'Create Article Title',
            'content' => 'Create Article Content',
            'thumbnail' => 'Upload Article Thumbnail',
            'author' => 'Insert Author Name',
        ]);
    }

}
