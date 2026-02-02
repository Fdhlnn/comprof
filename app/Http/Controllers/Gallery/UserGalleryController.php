<?php

namespace App\Http\Controllers\Gallery;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Inertia\Inertia;

class UserGalleryController extends Controller
{
    public function index()
    {
        $gallery = Gallery::orderBy('id', 'asc')->get()->map(function ($item) {
            return [
                'id'    => $item->id,
                'title' => $item->title,
                'image' => $item->image ? '/storage/' . $item->image : null,
            ];
        });

        // Render ke page FE
        return Inertia::render('comprof/gallery', [
            'gallery' => $gallery,
        ]);
    }
}
