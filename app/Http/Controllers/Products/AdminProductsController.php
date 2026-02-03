<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AdminProductsController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/products', [
            'products' => Products::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'  => 'required|string',
            'price' => 'required|integer',
            'image' => 'nullable|image|max:2048',
        ]);

        $data['image'] = $request->file('image')->store('products', 'public');

        Products::create($data);

        return back();
    }

    public function update(Request $request, Products $product)
    {
        $data = $request->validate([
            'name'  => 'required|string',
            'price' => 'required|integer',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($product->image);
            $data['image'] = $request->file('image')->store('products', 'public');
        } else {
            unset($data['image']); 
        }

        $product->update($data);

        return back();
    }

    public function destroy(Products $product)
    {
        Storage::disk('public')->delete($product->image);
        $product->delete();

        return back();
    }
}
