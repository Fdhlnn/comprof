<?php

namespace App\Http\Controllers\Gallery;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminGalleryController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/gallery', [
            'gallery' => Gallery::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'  => 'required|string',
            'image' => 'required|image|max:2048',
        ]);

        $data['image'] = $request->file('image')->store('gallery', 'public');

        Gallery::create($data);

        return back();
    }

    public function update(Request $request, Gallery $gallery)
    {
        $data = $request->validate([
            'title'  => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($gallery->image);
            $data['image'] = $request->file('image')->store('gallery', 'public');
        }

        $gallery->update($data);

        return back();
    }

    public function destroy(Gallery $gallery)
    {
        Storage::disk('public')->delete($gallery->image);
        $gallery->delete();

        return back();
    }
}
