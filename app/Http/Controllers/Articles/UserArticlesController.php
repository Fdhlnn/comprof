<?php

namespace App\Http\Controllers\Articles;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Inertia\Inertia;

class UserArticlesController extends Controller
{
    public function index()
    {
        $articles = Article::latest()->get()->map(function ($article) {
            return [
                'id' => $article->id,
                'title' => $article->title,
                'excerpt' => $article->excerpt,
                'image' => $article->image
                    ? '/storage/' . $article->image
                    : null,
                'date' => optional($article->created_at)->format('d M Y'),
            ];
        });

        return Inertia::render('comprof/articles', [
            'articles' => $articles,
        ]);
    }


    public function show($id)
    {
        $article = Article::findOrFail($id);

        return Inertia::render('comprof/detail-article', [
            'article' => [
                'id' => $article->id,
                'title' => $article->title,
                'content' => $article->content,
                'image' => $article->image
                    ? '/storage/' . $article->image
                    : null,
                'date' => optional($article->created_at)->format('d M Y'),
            ],
        ]);
    }
}
