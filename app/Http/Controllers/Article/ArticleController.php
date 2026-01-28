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

    public function edit(Article $article)
    {
        return inertia::render('Articles/Edit', [
            'article' => $article,
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'thumbnail' => 'nullable|string|max:255',
            'author' => 'required|string|max:255',
        ]);

        $article->update($validated);

        return redirect()->route('articles.index')->with('success', 'Article updated successfully.');
    }

}
